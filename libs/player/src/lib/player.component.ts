import { Select, Store } from '@ngxs/store';
import { AppState } from '@venobo/core';
// import { PlayerMedia } from '@venobo/shared';
import { Observable, Subject, Subscription } from 'rxjs';
// import * as renderer from 'wcjs-renderer';
import { debounceTime } from 'rxjs/operators';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef, Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { PlayerState, PlayerStateModel } from './player.state';
import { PlayerUiState } from './player-ui.state';
// import { WCJS_PLAYER } from './tokens';

@Component({
  selector: 'venobo-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {
  private subs = new Subscription();

  @ViewChild('renderer', { static: true }) renderer: ElementRef<HTMLCanvasElement>;
  @Select(AppState.isFullscreen) fullscreen$: Observable<boolean>;
  @Select(PlayerState) state$: Observable<PlayerStateModel>;
  /*@Select(PlayerState.isLoading) loading$: Observable<boolean>;
  @Select(PlayerState.isPaused) paused$: Observable<boolean>;
  @Select(PlayerState.isMuted) muted$: Observable<boolean>;*/
  @Select(PlayerUiState.isShown) uiShown$: Observable<boolean>;

  mediaMouseMove$ = new Subject<void>();
  media = {
    poster: 'https://i-viaplay-com.akamaized.net/viaplay-prod/725/956/1552640864-c4741d7cd72df50296357611b2ac6dbe594a066b.jpg?width=400&height=600',
    backdrop: 'https://i-viaplay-com.akamaized.net/viaplay-prod/303/280/1552661571-0e9a795d293e99d276e1bec3a9e17231d32e10ba.jpg?width=1600&height=900',
    title: '',
  };

  constructor(
    private readonly store: Store,
    //@Inject(WCJS_PLAYER)
    //private readonly player: any,
  ) {}

  confirmNavigateBack() {}

  toggleFullscreen() {}

  handleVolumeWheel(event: WheelEvent) {}

  playPause() {}

  ngOnInit(): void {
    this.subs.add(
      this.mediaMouseMove$
        .pipe(debounceTime(3000))
        .subscribe()
    );
  }

  /*ngAfterViewInit(): void {
    renderer.bind(this.renderer.nativeElement, this.player);
  }

  ngOnDestroy(): void {
    renderer.clear(this.renderer.nativeElement);
    this.subs.unsubscribe();
  }*/
}
