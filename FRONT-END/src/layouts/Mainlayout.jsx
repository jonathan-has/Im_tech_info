import { Outlet } from 'react-router-dom';
import React from 'react'
import {Header} from '../components/layout/Header';
import {Footer} from '../components/layout/Footer';

export const Mainlayout = () => {
  return (
    <div>
      <header><Header/></header>
      <div><Outlet/></div>
      <footer><Footer/></footer>
    </div>
  )
}
