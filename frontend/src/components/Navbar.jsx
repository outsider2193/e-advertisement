import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="/">Home</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <Link class="nav-link" to="/login">Login</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/register">Sign up</Link>
    </li>
    {/* <li class="nav-item">
      <Link class="nav-link" to="/formdemo1">Form1</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo2">Form2</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo3">Form3</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo4">Form4</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo5">Form5</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo6">Form6</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo7">Form7</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo8">Form8</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="/formdemo9">Form9</Link>
    </li> */}
    {/* <li class="nav-item">
      <Link class="nav-link" to="/formdemo10">Form10</Link>
    </li> */}
    </ul>
  
</div>
</nav>
  </div>
)
}
  

