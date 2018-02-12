import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

export const slide = trigger('slide', [
  transition(
    ':enter', [
      style({ transform: 'translateX(-10px)' }),
      animate(500)
    ]),

  transition(':leave', [
      animate('0.5s ease-out', keyframes([
        style({
          offset: .2,
          opacity: 1,
          transform: 'translateX(20px)'
        }),
        style({
          offset: 1,
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
      ]))
    ])
]);

export const avatar = trigger('avatar', [
  transition('* => *', [
    query('img',style({ transform: 'translate(-150%, -10px)'})),
    query('img',
      stagger('10ms', [
        animate('150ms ease-in', style({ transform: 'translateX(10px)'}))
      ]))
  ])
]);

export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    state('void', style({position:'fixed', width:'100%'}) ),
    state('*', style({position:'fixed', width:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);

