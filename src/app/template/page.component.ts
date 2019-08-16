import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/_services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass']
})
export class PageComponent implements OnInit {
  fragment = '';
  constructor(public auth: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

}
