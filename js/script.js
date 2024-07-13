let allUserData = [];
let regForm = document.querySelector(".registraion-form");
let allInputs = regForm.querySelectorAll("input");
let textAreaEl = regForm.querySelector("textarea");
let regList = document.querySelector(".tboday-regList");

// swal("Good job!", "You clicked the button!", "success");

if (localStorage.getItem("allUserData") != null) {
  let string = localStorage.getItem("allUserData");
  allUserData = JSON.parse(string);
}
regForm.onsubmit = (X) => {
  X.preventDefault();

  let user = {
    Name: allInputs[0].value,
    Email: allInputs[1].value,
    Password: allInputs[2].value,
    FatherName: allInputs[3].value,
    Address: textAreaEl.value,
  };
  if (allInputs[0].value != "") {
    if (allInputs[1].value != "") {
      if (allInputs[2].value != "") {
        if (allInputs[3].value != "") {
          if (textAreaEl.value != "") {
            allUserData.push(user);

            let string = JSON.stringify(allUserData);
            localStorage.setItem("allUserData", string);
            showUserData();
            // location.reload();
            swal("Good!", "Data reistered Succesful!", "success");
          } else {
            swal("Address is not reistered!");
          }
        } else {
          swal("Father's name is not reistered!");
        }
      } else {
        swal("password is not reistered!");
      }
    } else {
      swal("Email address is not reistered!");
    }
  } else {
    swal("Name is not reistered!");
  }
};

const showUserData = () => {
  regList.innerHTML = "";
  allUserData.forEach((item, index) => {
    regList.innerHTML += `            
    <tr class="allUserData-row">
               <td>${index + 1}.</td>
              <td > ${item.Name}</td>
              <td >${item.Email}</td>
              <td >${item.Password}</td>
              <td >${item.FatherName}</td>
              <td>${item.Address}</td>
              <td class=" btn-desn d-flex"> 
                <button class="btn p-1 px-2 edit-btn btn-success ">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn del-btn p-1 px-2 btn-danger ms-1"> 
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
 `;
  });
  // delete code
  let allDelBtn = regList.querySelectorAll(".del-btn");
  allDelBtn.forEach((el, index) => {
    el.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          allUserData.splice(index, 1);
          localStorage.setItem("allUserData", JSON.stringify(allUserData));
          showUserData();
          swal("ok! Your data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!");
        }
      });
    };
  });
  // update code
  let allEditBtn = regList.querySelectorAll(".edit-btn");
  allEditBtn.forEach((el, index) => {
    el.onclick = () => {
      let tr = el.parentElement.parentElement;
      let allTd = tr.querySelectorAll("td");
      // for (let i = 1; i < allTd.length - 1; i++) {
      //   allTd[i].style.border = "2px solid red";
      //   allTd[i].contentEditable = true;
      //   let btnTd = allTd[allTd.length - 1];
      //   let editBtn = btnTd.querySelector("button");
      //   editBtn.innerHTML = "<i class='fa fa-save'></i>";
      //   editBtn.onclick = () => {
      //     let obj = {
      //       name: allTd[1].innerText.trim(),
      //       email: allTd[2].innerText.trim(),
      //       password: allTd[3].innerText.trim(),
      //       fatherName: allTd[4].innerText.trim(),
      //       address: allTd[5].innerText.trim(),
      //     };
      //     allUserData[index] = obj;
      //     localStorage.setItem("allUserData", JSON.stringify(allUserData));
      //     showUserData();
      //   };
      // }
      for (let i = 1; i < allTd.length - 2; i++) {
        allInputs[i - 1].value = allTd[i].innerHTML;
        textAreaEl.value = allTd[allTd.length - 2].innerHTML;
      }
      let submitBtn = regForm.querySelector("button");
      submitBtn.innerHTML = "<i class='fa fa-save'></i>";
      submitBtn.onclick = (X) => {
        X.preventDefault();
        let user = {
          Name: allInputs[0].value,
          Email: allInputs[1].value,
          Password: allInputs[2].value,
          FatherName: allInputs[3].value,
          Address: textAreaEl.value,
        };
        allUserData.splice(index, 1, user);
        let string = JSON.stringify(allUserData);
        localStorage.setItem("allUserData", string);
        showUserData();
        
      };
    };
    
  });
};
showUserData();
// location.reload();