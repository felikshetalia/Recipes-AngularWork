import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Recipes } from "./recipes/recipes";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Recipes],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected title = 'Recipes';
}
