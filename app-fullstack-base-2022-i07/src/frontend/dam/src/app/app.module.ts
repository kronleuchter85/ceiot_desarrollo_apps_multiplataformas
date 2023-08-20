import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// import { DetalleSensorComponent } from './detalle-sensor/detalle-sensor.component';
// import { ListadoModule } from './listado/listado.module';
import { ListadoComponent } from './listado/listado.component';
import { SpacefyPipe } from './pipes/spacefy.pipe';
import { ShowReadingDirective } from './directives/show-reading.directive';
import { FormsModule } from '@angular/forms';
import { ListadoService } from './services/listado.service';
import { DetalleSensorComponent } from './detalle-sensor/detalle-sensor.component';

@NgModule({
  declarations: [AppComponent ,ListadoComponent
    , DetalleSensorComponent
     , SpacefyPipe , ShowReadingDirective
  ],
  imports: [BrowserModule, IonicModule.forRoot()
    , AppRoutingModule
    , HttpClientModule 
    , FormsModule
    , HttpClientModule 
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }],
  bootstrap: [AppComponent],
  exports: [ListadoComponent,DetalleSensorComponent],
  
})
export class AppModule {}
