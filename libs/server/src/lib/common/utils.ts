//const reverse = p => new Promise((resolve, reject) => Promise.resolve(p).then(reject, resolve));
//export const any = arr => reverse(Promise.all(arr.map(reverse)));

export async function didResolve(promiseFn: () => Promise<any>) {
  try {
    await promiseFn();

    return true;
  } catch {
    return false;
  }
}

export function filterResolved<T>(from: T[], to: boolean[]): T[] {
  return from
    .map((x, i) => [x, to[i]])
    .filter(provider => !!provider[1])
    .map(a => a.shift()) as T[];
}

// there's literally no rxjs equivalent of this
export function any<T = any>(sources: Promise<T>[]): Promise<T> {
  return Promise.all(sources.map(source =>
    source.then(
      val => Promise.reject(val),
      err => Promise.resolve(err),
    )
  )).then(
    errors => Promise.reject(errors),
    val => Promise.resolve(val),
  );
}
/*return zip(...sources.map(source$ => {
  return source$.pipe(
    map(val => catchError(val)),
    catchError(err => of(err)),
  );
})).pipe(
  // map(errors => catchError(errors as any)),
  catchError(values => of(values)),
);*/
