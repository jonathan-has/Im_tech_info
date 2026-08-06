import React from 'react'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router'

export const Authlayout = () => {
  return (
    <div><Outlet/></div>
  )
}
