import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';

import {NgxsModule} from '@ngxs/store';
import {StorageModule} from '@ngx-pwa/local-storage';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';

import {StopwatchState} from './state/stopwatch.state';
import {TimesComponent} from './components/times/times.component';
import {StopwatchComponent} from './components/stopwatch/stopwatch.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesComponent,
    StopwatchComponent,
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
        StopwatchState
      ],
      {
        developmentMode: !environment.production
      }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    StorageModule.forRoot({
      IDBNoWrap: true,
    }),
    NgxsStoragePluginModule.forRoot({
      migrations: [
        {
          version: 1,
          migrate: (state) => {
            return {
              state,
              version: 2
            };
          }
        }
      ]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
