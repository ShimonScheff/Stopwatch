import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxsModule} from '@ngxs/store';
import {StopwatchState} from './state/stopwatch.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {TimesComponent} from './components/times/times.component';
import {StopwatchComponent} from './components/stopwatch/stopwatch.component';
import {StorageModule} from '@ngx-pwa/local-storage';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TimesComponent,
    StopwatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
