import React from "react";

import { RICH_FORMATS } from '../constants';

export const RICH_FORMAT_ICONS = {
  [RICH_FORMATS.BOLD]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>,
  [RICH_FORMATS.ITALICS]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/></svg>,
  [RICH_FORMATS.NUMBERED_LIST]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>,
  [RICH_FORMATS.BULLETED_LIST]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>,
  [RICH_FORMATS.HYPERLINK]: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.26667 7.33333C2.26667 6.19333 3.19333 5.26667 4.33333 5.26667H7V4H4.33333C2.49333 4 1 5.49333 1 7.33333C1 9.17333 2.49333 10.6667 4.33333 10.6667H7V9.4H4.33333C3.19333 9.4 2.26667 8.47333 2.26667 7.33333ZM5 8H10.3333V6.66667H5V8ZM8.33333 4H11C12.84 4 14.3333 5.49333 14.3333 7.33333C14.3333 9.17333 12.84 10.6667 11 10.6667H8.33333V9.4H11C12.14 9.4 13.0667 8.47333 13.0667 7.33333C13.0667 6.19333 12.14 5.26667 11 5.26667H8.33333V4Z" fill="black" fillOpacity="0.8"/></svg>,
  [RICH_FORMATS.EMOJIS]: <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 210.000000 225.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,210.000000) scale(0.090000,-0.090000)" fill="#000000" stroke="none"><path d="M905 2184 c-388 -86 -708 -399 -807 -790 -20 -77 -23 -114 -22 -274 0 -167 3 -194 27 -283 104 -388 427 -694 817 -773 128 -25 375 -16 493 20 182 54 319 136 452 270 141 141 234 302 287 496 20 75 23 107 23 275 0 168 -3 200 -23 275 -53 194 -146 355 -287 496 -133 134 -270 215 -452 270 -78 24 -108 27 -263 30 -131 3 -192 0 -245 -12z m478 -148 c301 -89 537 -328 634 -643 25 -82 27 -101 27 -268 0 -167 -2 -186 -27 -268 -52 -168 -140 -311 -262 -426 -117 -109 -226 -173 -372 -218 -80 -24 -104 -27 -253 -27 -143 -1 -176 2 -243 22 -315 91 -556 330 -653 647 -26 84 -28 102 -28 270 0 168 2 186 28 270 94 308 337 555 629 640 101 29 148 34 292 30 115 -2 156 -8 228 -29z"/><path d="M746 1570 c-43 -13 -90 -49 -117 -88 -20 -29 -24 -48 -24 -107 0 -62 4 -77 28 -112 84 -122 265 -113 335 17 33 62 28 150 -11 207 -46 67 -142 105 -211 83z"/><path d="M1408 1571 c-89 -29 -140 -93 -146 -185 -3 -50 1 -69 20 -106 91 -170 350 -118 366 74 5 67 -10 114 -50 155 -55 56 -130 81 -190 62z"/><path d="M473 961 c20 -256 213 -495 461 -570 389 -118 783 137 846 547 7 40 9 80 6 88 -5 12 -99 14 -662 14 l-657 0 6 -79z m1153 -99 c-58 -164 -188 -293 -346 -343 -88 -28 -221 -28 -310 0 -158 50 -288 179 -346 343 l-13 38 514 0 514 0 -13 -38z"/></g></svg>
};

export const RICH_FORMAT_ICONS_SELECTED = {
  [RICH_FORMATS.BOLD]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>,
  [RICH_FORMATS.ITALICS]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/></svg>,
  [RICH_FORMATS.NUMBERED_LIST]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg>,
  [RICH_FORMATS.BULLETED_LIST]: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>,
  [RICH_FORMATS.HYPERLINK]: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2.26667 7.33333C2.26667 6.19333 3.19333 5.26667 4.33333 5.26667H7V4H4.33333C2.49333 4 1 5.49333 1 7.33333C1 9.17333 2.49333 10.6667 4.33333 10.6667H7V9.4H4.33333C3.19333 9.4 2.26667 8.47333 2.26667 7.33333ZM5 8H10.3333V6.66667H5V8ZM8.33333 4H11C12.84 4 14.3333 5.49333 14.3333 7.33333C14.3333 9.17333 12.84 10.6667 11 10.6667H8.33333V9.4H11C12.14 9.4 13.0667 8.47333 13.0667 7.33333C13.0667 6.19333 12.14 5.26667 11 5.26667H8.33333V4Z" fill="white" fillOpacity="0.8"/></svg>,
  [RICH_FORMATS.EMOJIS]: <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px" height="20px" viewBox="0 0 210.000000 225.000000" preserveAspectRatio="xMidYMid meet" fill="#ffffff"><g transform="translate(0.000000,210.000000) scale(0.090000,-0.090000)" fill="#ffffff" stroke="none"><path d="M905 2184 c-388 -86 -708 -399 -807 -790 -20 -77 -23 -114 -22 -274 0 -167 3 -194 27 -283 104 -388 427 -694 817 -773 128 -25 375 -16 493 20 182 54 319 136 452 270 141 141 234 302 287 496 20 75 23 107 23 275 0 168 -3 200 -23 275 -53 194 -146 355 -287 496 -133 134 -270 215 -452 270 -78 24 -108 27 -263 30 -131 3 -192 0 -245 -12z m478 -148 c301 -89 537 -328 634 -643 25 -82 27 -101 27 -268 0 -167 -2 -186 -27 -268 -52 -168 -140 -311 -262 -426 -117 -109 -226 -173 -372 -218 -80 -24 -104 -27 -253 -27 -143 -1 -176 2 -243 22 -315 91 -556 330 -653 647 -26 84 -28 102 -28 270 0 168 2 186 28 270 94 308 337 555 629 640 101 29 148 34 292 30 115 -2 156 -8 228 -29z"/><path d="M746 1570 c-43 -13 -90 -49 -117 -88 -20 -29 -24 -48 -24 -107 0 -62 4 -77 28 -112 84 -122 265 -113 335 17 33 62 28 150 -11 207 -46 67 -142 105 -211 83z"/><path d="M1408 1571 c-89 -29 -140 -93 -146 -185 -3 -50 1 -69 20 -106 91 -170 350 -118 366 74 5 67 -10 114 -50 155 -55 56 -130 81 -190 62z"/><path d="M473 961 c20 -256 213 -495 461 -570 389 -118 783 137 846 547 7 40 9 80 6 88 -5 12 -99 14 -662 14 l-657 0 6 -79z m1153 -99 c-58 -164 -188 -293 -346 -343 -88 -28 -221 -28 -310 0 -158 50 -288 179 -346 343 l-13 38 514 0 514 0 -13 -38z"/></g></svg>
};

export const ATTACHMENTS_ICON = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>;
export const CONFIRM_LINK_ICON = <svg width="10" height="10" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.680028" fillRule="evenodd" clipRule="evenodd" d="M5.99991 11.17L1.82991 7L0.409912 8.41L5.99991 14L17.9999 2L16.5899 0.589996L5.99991 11.17Z" fill="black"/></svg>;
export const REMOVE_LINK_ICON = <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.680028" fillRule="evenodd" clipRule="evenodd" d="M8.70896 0.229556L4.99966 3.93076L1.29138 0.221466C0.995078 -0.0738219 0.517764 -0.0738219 0.221466 0.221466C-0.0738219 0.517764 -0.0738219 0.995078 0.221466 1.29138L3.93076 4.99966L0.221466 8.70896C-0.0738219 9.00425 -0.0738219 9.48257 0.221466 9.77786C0.517764 10.0742 0.995078 10.0742 1.29138 9.77786L4.99966 6.06957L8.70896 9.77786C9.00425 10.0742 9.48257 10.0742 9.77786 9.77786C10.0742 9.48257 10.0742 9.00425 9.77786 8.70896L6.06957 4.99966L9.77786 1.29138C10.0661 1.00317 10.0661 0.517764 9.77786 0.229556C9.48257 -0.0657318 9.00425 -0.0657318 8.70896 0.229556Z" fill="black"/></svg>;