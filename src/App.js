import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState('')
  // Run when page reloads
  useEffect(() => {
    console.log("RENDER Page")
  }, [])
  // Run everytime
  useEffect(() => {
    console.log("use effect 1 ")
  }, )
  // Run everytime when posts value changes
  useEffect(() => {
    console.log('use effect 2')
    let letterList = []
    letterList.push(posts)
    console.log(letterList)
}, [posts]);

  return (
    <div>
      <p>render</p>
      <input type="text" onChange={(e)=> {setPosts(e.target.value)}}/>
    </div>
  );
}

function ResizeWindow(){
  let [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    console.log("re render")
    window.addEventListener('resize', (() => {updateWindowWidth()}))
    const data = {
      "email" : 'test@email.com',
      "password" : 'Test@1234'
    }
    fetch('https://notemy-api.deta.dev/api/v1/auth/login/',{
      method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)})
      .then(response => response.json())
      .then(data => console.log(data));
    return () =>{
    window.removeEventListener('resize', (() => {updateWindowWidth()}))}
  }, [])
  const updateWindowWidth = () =>{
    setWindowWidth(window.innerWidth)
  }
  return(
    <div>
      <p>Hi</p>
      <p>window width is {windowWidth}</p>
    </div>
  )

}
export default ResizeWindow;

