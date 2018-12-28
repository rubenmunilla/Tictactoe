import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { StateService } from './state.service';
import { FooterComponent } from './footer/footer.component';
import { ButtonsComponent } from './buttons/buttons.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GameComponent, HeaderComponent, BoardComponent, SquareComponent, FooterComponent, ButtonsComponent],
  exports: [GameComponent],
  providers: [StateService]
})
export class GameModule { }
