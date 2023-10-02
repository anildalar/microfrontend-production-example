const htmlBody = () => `
    <style>
        .image {
            max-height: 100%;
            max-width: 100%;
        }
        .layout {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .container {
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: center;
            overflow-x: hidden;
        }
        @media screen and (max-width: 992px) {
            .layout {
                min-height: 97vh;
            }
        }
    </style>
    <div class="layout">
        <div class="container">
            <center>
                <h1>Loading...</h1>
            </center>
        </div>
    </div>
`

const htmlStyles = () => (`
    <style>
      /* Hide scrollbar for Chrome, Safari and Opera */
      body::-webkit-scrollbar{
        display: none; 
      }
      /* Hide scrollbar for IE, Edge and Firefox */
      body {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
      }
      input::-ms-reveal,
      input::-ms-clear {
        display: none;
      }
      body, h1, h2, h3, h4, h5, h6 {
        margin: 0px;
      }
    </style>
`)

exports.staticContent = { htmlBody, htmlStyles }
