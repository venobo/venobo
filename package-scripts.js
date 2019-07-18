const nps = require('nps-utils');
const { join } = require('path');

function forEachApplication(command) {
  return {
    main: command.replace(/APPLICATION/g, 'main'),
  };
}

function affected(affectedCommand) {
  return {
    'origin-master': `nx affected:${affectedCommand} --base=origin/master --parallel`,
    'upstream-master': `nx affected:${affectedCommand} --base=upstream/master --parallel`
  };
}

function electronBuilder(platform, dashP, extraFlags) {
  return `electron-builder ${platform} -p ${dashP} ${
    extraFlags ? extraFlags : ''
    }`;
}

const ELECTRON_BUNDLE_PATH = join('dist', 'apps', 'main', 'main');

module.exports = {
  scripts: {
    start: 'electron dist/apps/main/main',
    dev: {
      default: nps.series(
        'nps dev.server',
        nps.concurrent({
          codegen: 'nps dev.codegen',
          renderer: 'nps dev.renderer'
        }),
        'nps dev.main',
      ),
      server: 'ng serve main',
      codegen: 'graphql-codegen --watch',
      renderer: 'ng serve renderer --aot',
      main: {
        build: 'ng build main --maxWorkers=4 --noSourceMap',
        default: nps.series.nps('dev.main.build', 'start'),
        start: 'electron dist/apps/main/main --inspect=9229'
      },
      up: {
        cypress: nps.concurrent({
          server: 'nps dev.server.start',
          renderer: 'ng run renderer:serve:cypress'
        })
      }
    },
    clean: 'shx rm -rf dist/',
    prepare: {
      and: {
        e2e: {
          up: nps.series.nps('prepare.e2e', 'e2e.up'),
          headless: nps.series.nps('prepare.e2e', 'e2e.headless')
        },
        package: {
          ...forEachApplication(
            nps.series.nps('prepare.APPLICATION', 'package.APPLICATION')
          )
        }
      },
      e2e: {
        default: nps.concurrent.nps('prepare.main', 'e2e.fixtures'),
        and: {
          'check-formatting': nps.concurrent.nps(
            'prepare.e2e',
            'format.and.lint.check'
          )
        }
      },
      ...forEachApplication(
        nps.series.nps(
          'build.APPLICATION',
        )
      ),
      dev: {
        ...forEachApplication(
          nps.series.nps(
            'build.APPLICATION.dev',
          )
        )
      }
    },
    package: {
      electronMac: nps.series(
        'echo "${CSC_LINK:?Need to set CSC_LINK non-empty}" > /dev/null',
        electronBuilder('--mac', 'never'),
        electronBuilder('--linux', 'never')
      ),
      electronWin: nps.series(electronBuilder('--win', 'never')),
    },
    publish: {
      electronWin: nps.series(
        'nps prepare.main',
        electronBuilder(
          '--win',
          'always',
          '--config.win.certificateSubjectName="Venobo"'
        )
      )
    },
    e2e: {
      fixtures: 'node ./tools/scripts/set-up-e2e-fixtures.js',
      up: 'node ./tools/scripts/e2e.js --watch',
      headless: {
        default: 'node ./tools/scripts/e2e.js --headless',
        'new-fixtures': nps.series.nps('prepare.e2e', 'e2e.headless')
      },
      ci1: 'node ./tools/scripts/e2e.js --headless --configuration=ci1',
      ci2: 'node ./tools/scripts/e2e.js --headless --configuration=ci2',
      ci3: 'node ./tools/scripts/e2e.js --headless --configuration=ci3'
    },
    format: {
      default: 'nx format:write',
      and: {
        lint: {
          check: nps.concurrent.nps('format.check', 'lint')
        }
      },
      write: 'nx format:write',
      check: 'nx format:check'
    },
    lint: {
      default: nps.concurrent({
        nxLint: 'nx lint',
        tsLint: 'npx tslint -p tsconfig.json -e **/generated/* -c tslint.json',
        stylelint: 'stylelint "{apps,libs}/**/*.scss" --config .stylelintrc'
      }),
      fix: nps.concurrent({
        tslint:
          'npx tslint -p tsconfig.json -e **/generated/* -c tslint.json --fix',
        stylelint:
          'stylelint "{apps,libs}/**/*.scss" --config .stylelintrc --fix'
      })
    },
    build: {
      default: 'nx affected:build --all --parallel',
      affected: affected('build'),
      ...forEachApplication(
        nps.series(
          'nps dev.gen-graphql',
          nps.concurrent({
            main: 'ng build APPLICATION --prod --maxWorkers=4 --noSourceMap',
            renderer: 'ng build renderer --prod'
          })
        )
      ),
      dev: {
        ...forEachApplication(
          nps.series(
            'nps dev.gen-graphql',
            nps.concurrent({
              server: 'ng build APPLICATION --maxWorkers=4',
              client: 'ng build renderer --configuration=APPLICATION'
            })
          )
        )
      }
    },
    test: {
      default: 'nx affected:test --all --parallel',
      affected: affected('test')
    },
  }
};
