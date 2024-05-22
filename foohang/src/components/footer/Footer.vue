<template>
  <footer>
    <div class="footer">
      <div class="row1Top">
        <div class="row1">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
        </div>
      </div>

      <div class="row">
        <ul>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Our Services</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Career</a></li>
        </ul>
      </div>

      <div class="row">
        Foohang Copyright © 2024 JAEJUNHO - All rights reserved
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
body {
  margin: 0;
  overflow-x: hidden;
  padding-bottom: 60px;
}

.footer {
  left: 0;
  bottom: 0;
  width: 100%;
  background: #cccccc70;
  padding: 30px 0;
  font-family: "Play", sans-serif;
  text-align: center;
  z-index: 1000;
}

.footer .row {
  width: 100%;
  margin: 1% 0;
  padding: 0.6% 0;
  color: gray;
  font-size: 0.8em;
}

.footer .row a {
  text-decoration: none;
  color: gray;
  transition: 0.5s;
}

.footer .row a:hover {
  color: #fff;
}

.footer .row ul {
  width: 100%;
}

.footer .row ul li {
  display: inline-block;
  margin: 0 30px;
}

.footer .row a i {
  font-size: 100px;
  margin: 100% 100%;
}

.row1Top {
  display: flex;
  justify-content: center;
}

.row1 {
  display: flex;
  width: 300px;
  font-size: x-large;
  justify-content: space-around;
}

.footer .row1 a {
  text-decoration: none;
  color: gray;
  transition: 0.5s;
}

.footer .row1 a:hover {
  color: #fff;
}
</style>
