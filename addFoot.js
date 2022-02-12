const table = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@500&display=swap');
        #foot{
            background-color: rgb(144, 211, 255);
            border-spacing: 10px;
        }
        #foot > * > * > * > * > *{
            font-family: 'DM Sans', sans-serif;
            font-size: 18px;
            color: rgba(117, 0, 98, 0.452);
        }
        #foot > * > * > * :hover {
            color: white;
        }
    </style>
    <table id="foot">
        <tr>
            <td style="height: 20px;"></td>
        </tr>
        <tr>
            <td rowspan="5" class="heading" style="font-size: 50px;">Orpheus</td>
        </tr>
        <tr>
            <td><a href="https://orpheus-2.herokuapp.com/"><button>Home</button></a></td>
        </tr>
        <tr>
            <td><a href="https://github.com/JasonBenfrin/Orpheus"><button>Source</button></a></td>
        </tr>
        <tr>
            <td><a href="https://orpheus-2.herokuapp.com/support"><button>Support</button></a></td>
        </tr>
        <tr>
            <td><a href="https://twitter.com/BhoneMyatMin9"><button>Tweet me at Twitter</button></a></td>
        </tr>
        <tr>
            <td style="height: 20px;"></td>
        </tr>
    </table>
`
// const table = new DOMParser().parseFromString(tableHTML, 'text/html')
const body = document.querySelector('body')
body.insertAdjacentHTML('beforeend', table)