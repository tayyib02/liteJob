import React, { useEffect } from 'react'
import LeftSortField from './LeftSortField'
import NavbarTwo from './NavbarTwo'
import axios from 'axios'
const HomeBody = () => {

  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch("/Home")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <NavbarTwo />
      <LeftSortField />

      {/* This is the start of Home Body */}
      <div>{data}</div>
    </div>
  )
}

export default HomeBody