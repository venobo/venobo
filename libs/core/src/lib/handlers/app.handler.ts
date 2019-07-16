import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeOnlineStatus, IsOffline, IsOnline } from '../state/app';

@Injectable({
  providedIn: 'root',
})
export class AppHandler {
  private readonly renderer: Renderer2;

  constructor(
    private readonly rendererFactory: RendererFactory2,
    private readonly store: Store,
  ) {
    this.renderer = rendererFactory.createRenderer(window, null);

    this.renderer.listen(window, 'online', () => {
      this.store.dispatch([new ChangeOnlineStatus(), new IsOnline()]);
    });

    this.renderer.listen(window, 'offline', () => {
      this.store.dispatch([new ChangeOnlineStatus(), new IsOffline()]);
    });
  }
}
