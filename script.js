// script.js
const data = [
    { id: 0, name: "Janu", English: 50, Maths: 86, Science: 77, SocialScience: 88 },
    { id: 1, name: "Thanu", English: 75, Maths: 96, Science: 67, SocialScience: 91 },
    { id: 2, name: "Tara", English: 90, Maths: 35, Science: 86, SocialScience: 100 },
    { id: 3, name: "Glen", English: 79, Maths: 68, Science: 77, SocialScience: 78 },
    { id: 4, name: "Zara", English: 80, Maths: 85, Science: 96, SocialScience: 68 },
  ];
  
  let currentData = [...data];
  
  document.addEventListener('DOMContentLoaded', () => {
    renderTable(currentData);
    document.getElementById('filterBtn').addEventListener('click', filterData);
    document.getElementById('clearBtn').addEventListener('click', clearFilter);
    document.querySelectorAll('th').forEach(th => th.addEventListener('click', sortTable));
    document.querySelectorAll('input[name="filter"]').forEach(radio => radio.addEventListener('change', toggleBetween));
  });
  
  function renderTable(data) {
    const tableBody = document.getElementById('studentTable');
    tableBody.innerHTML = '';
    data.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.English}</td>
        <td>${student.Maths}</td>
        <td>${student.Science}</td>
        <td>${student.SocialScience}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function filterData() {
    const subject = document.getElementById('subject').value;
    const filterType = document.querySelector('input[name="filter"]:checked').value;
    const value1 = parseFloat(document.getElementById('value1').value);
    const value2 = parseFloat(document.getElementById('value2').value);
  
    if (filterType === 'Above') {
      currentData = data.filter(student => student[subject] > value1);
    } else if (filterType === 'Below') {
      currentData = data.filter(student => student[subject] < value1);
    } else if (filterType === 'Between') {
      currentData = data.filter(student => student[subject] > value1 && student[subject] < value2);
    }
  
    renderTable(currentData);
  }
  
  function clearFilter() {
    currentData = [...data];
    renderTable(currentData);
    document.getElementById('value1').value = '';
    document.getElementById('value2').value = '';
  }
  
  function sortTable(event) {
    const column = event.target.getAttribute('data-column');
    currentData.sort((a, b) => {
      if (a[column] > b[column]) {
        return 1;
      } else if (a[column] < b[column]) {
        return -1;
      } else {
        return 0;
      }
    });
    renderTable(currentData);
  }
  
  function toggleBetween() {
    const filterType = document.querySelector('input[name="filter"]:checked').value;
    const value2Input = document.getElementById('value2');
    if (filterType === 'Between') {
      value2Input.style.display = 'inline';
    } else {
      value2Input.style.display = 'none';
    }
  }
  