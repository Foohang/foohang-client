<template>
  <div class="card">
    <div class="card-border-top"></div>
    <div class="img"></div>
    <span>Person</span>
    <p class="job">Job Title</p>
    <button>Click</button>
  </div>
</template>

<style scoped>
.card {
  width: 190px;
  height: 254px;
  background: #f57c00; /* 주황색 배경 */
  border-radius: 15px;
  box-shadow: 1px 5px 60px 0px #ffcc80; /* 주황색 그림자 */
}

.card .card-border-top {
  width: 60%;
  height: 3%;
  background: #ffb74d; /* 연한 주황색 */
  margin: auto;
  border-radius: 0px 0px 15px 15px;
}

.card span {
  font-weight: 600;
  color: white;
  text-align: center;
  display: block;
  padding-top: 10px;
  font-size: 16px;
}

.card .job {
  font-weight: 400;
  color: white;
  display: block;
  text-align: center;
  padding-top: 3px;
  font-size: 12px;
}

.card .img {
  width: 70px;
  height: 80px;
  background: #ffb74d; /* 연한 주황색 */
  border-radius: 15px;
  margin: auto;
  margin-top: 25px;
}

.card button {
  padding: 8px 25px;
  display: block;
  margin: auto;
  border-radius: 8px;
  border: none;
  margin-top: 30px;
  background: #ff9800; /* 주황색 */
  color: white;
  font-weight: 600;
}

.card button:hover {
  background: #fb8c00; /* 조금 더 진한 주황색 */
}
</style>
