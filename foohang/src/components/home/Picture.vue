<template>
    <v-carousel cycle height="200"
    show-arrows="hover"
    hide-delimiters>
      <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      ></v-carousel-item>
    </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: "https://private-user-images.githubusercontent.com/72538151/330829497-6ef965a3-33a3-41bd-a93e-97f198caecc7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU3ODExMzEsIm5iZiI6MTcxNTc4MDgzMSwicGF0aCI6Ii83MjUzODE1MS8zMzA4Mjk0OTctNmVmOTY1YTMtMzNhMy00MWJkLWE5M2UtOTdmMTk4Y2FlY2M3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE1VDEzNDcxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJiYjk4MmI3NjkwNWZjNDJhMzI2NGY0MWU1ODM4ODUxNmFiYjI2Yzk4MjJiZjg1ZTg5YWU4ZTkyZjVkZDE2MzYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.SP174vQCI7LUC24JSUzVI94ytaMcIE8zW9dvyl70nLI",
          },
          {
            src: 'https://private-user-images.githubusercontent.com/72538151/330829510-61a583fe-b6d7-4d9a-846e-54af6e15e4f0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU3ODExMzEsIm5iZiI6MTcxNTc4MDgzMSwicGF0aCI6Ii83MjUzODE1MS8zMzA4Mjk1MTAtNjFhNTgzZmUtYjZkNy00ZDlhLTg0NmUtNTRhZjZlMTVlNGYwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE1VDEzNDcxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY5ZGI0YzRkODI3NThlZWI5MTQ1MDhjMTM2OTU0NzQxMTE4ZDkwYzQ4YzZhZDQxNzhlYzRjYmM1OTI1OTE5NTMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.dG6XGvzoJKyr2tkp41yXvTAOK4xrAPQdAYCEO088Wx0',
          },
          {
            src: 'https://private-user-images.githubusercontent.com/72538151/330829541-0a2f622e-2ded-4212-a8a6-c6495bdf4067.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU3ODExMzEsIm5iZiI6MTcxNTc4MDgzMSwicGF0aCI6Ii83MjUzODE1MS8zMzA4Mjk1NDEtMGEyZjYyMmUtMmRlZC00MjEyLWE4YTYtYzY0OTViZGY0MDY3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE1VDEzNDcxMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWJlMzk2Mjc1MzU0ODYzZTViOTM1MTJmOTQwZTFkN2Y2MTVjZTAwMTRhZTY4ZWY1NGUzNGJiMDc3ZWJkOWY5YzImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Lj08qkjAlly8EzH302tm6AMxv6TZf1PoPppQeo1y6Z4',
          },
        ],
      }
    },
  }
</script>

<style scoped>
</style>
