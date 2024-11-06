function editContent(id) {
  // Tìm row hiện tại
  const row = document.querySelector(`button[onclick="editContent('${id}')"]`).closest('tr');
  const currentName = row.cells[0].textContent;
  
  // Tạo input để edit
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentName;
  input.style.width = '100%';
  input.style.padding = '5px';
  
  // Thay thế text bằng input
  row.cells[0].textContent = '';
  row.cells[0].appendChild(input);
  
  // Focus vào input
  input.focus();
  
  // Xử lý khi nhấn Enter hoặc click ra ngoài
  function handleEdit(e) {
    if (e.type === 'keyup' && e.key !== 'Enter') return;
    
    const newName = input.value.trim();
    if (newName) {
      // Cập nhật tên trong bảng admin
      row.cells[0].textContent = newName;
      
      // Cập nhật navigation
      const navLink = document.querySelector(`a[onclick="showContent('${id}')"]`);
      if (navLink) {
        // Giữ lại icon nếu có (như trường hợp trang chủ)
        const icon = navLink.querySelector('i');
        if (icon) {
          navLink.innerHTML = '';
          navLink.appendChild(icon);
          navLink.appendChild(document.createTextNode(' ' + newName));
        } else {
          navLink.textContent = newName;
        }
      }
      
      // Cập nhật sidebar nếu đang ở section được edit
      updateSidebar(id, newName);

      // Cập nhật tất cả các header trong các view khác
      updateAllHeaders(id, currentName, newName);
      
      // Cập nhật tất cả các grid header
      updateAllGridHeaders(id, currentName, newName);
    } else {
      row.cells[0].textContent = currentName;
    }
    
    // Cleanup event listeners
    input.removeEventListener('blur', handleEdit);
    input.removeEventListener('keyup', handleEdit);
  }
  
  input.addEventListener('blur', handleEdit);
  input.addEventListener('keyup', handleEdit);
}

// Thêm hàm mới để cập nhật tất cả các header
function updateAllHeaders(id, oldName, newName) {
  // Cập nhật header trong Admin contents layout
  document.querySelectorAll('.header').forEach(header => {
    if (header.textContent.includes(oldName)) {
      header.textContent = header.textContent.replace(oldName, newName);
    }
  });
}

// Thêm hàm mới để cập nhật tất cả các grid header
function updateAllGridHeaders(id, oldName, newName) {
  // Cập nhật grid header trong tất cả các view
  document.querySelectorAll('.seminar-header').forEach(header => {
    if (header.textContent === oldName) {
      header.textContent = newName;
    }
  });

  // Cập nhật tên trong các grid item
  document.querySelectorAll('.seminar-title').forEach(title => {
    if (title.textContent.includes(oldName)) {
      // Chỉ thay thế phần tên menu, giữ nguyên số thứ tự
      const parts = title.textContent.split(' ');
      const number = parts[parts.length - 1];
      const prefix = oldName.split(' ').slice(0, -1).join(' ');
      const newPrefix = newName.split(' ').slice(0, -1).join(' ');
      title.textContent = title.textContent.replace(prefix, newPrefix);
    }
  });
}

function updateSidebar(id, newName) {
  const sidebar = document.getElementById('mySidebar');
  
  // Cập nhật tiêu đề sidebar tương ứng với section
  if (id === 'courseInfo') {
    sidebar.querySelector('h4 b').textContent = newName;
  } else if (id === 'info') {
    sidebar.querySelector('h4 b').textContent = newName;
  } else if (id === 'web-tech') {
    sidebar.querySelector('h4 b').textContent = newName;
  } else if (id === 'student-info') {
    sidebar.querySelector('h4 b').textContent = newName;
  } else if (id === 'student-info-2') {
    sidebar.querySelector('h4 b').textContent = newName;
  }
}

// Cập nhật hàm showContent để xử lý tên mới trong sidebar
function showContent(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.w3-container');
  sections.forEach(section => section.classList.add('hidden'));

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.w3-bar-item');
  buttons.forEach(button => button.classList.remove('active'));

  // Show selected section
  document.getElementById(sectionId).classList.remove('hidden');

  const sidebar = document.getElementById("mySidebar");
  sidebar.innerHTML = '';

  // Lấy tên hiện tại từ navigation
  const currentName = document.querySelector(`a[onclick="showContent('${sectionId}')"]`).textContent.trim();

  if (sectionId === 'courseInfo') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>${currentName}</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#classInfo">Thông tin khai giảng</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#seminar">Thông tin Seminar</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#company">Thông tin công ty quan tâm</a>
    `;
  } else if (sectionId === 'info') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>${currentName}</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#summaryVN">Mô t tóm tắt học phần (tiếng Việt) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#summaryEN">Mô tả tóm tắt học phần (tiếng Anh) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#contentVN">Nội dung tóm tắt học phần (tiếng Việt) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#contentEN">Nội dung tóm tắt học phần (tiếng Anh) (*)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#reference">Sách tham khảo</a>
    `;
  } else if (sectionId === 'web-tech') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>${currentName}</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#frontend">1. Frontend (Giao diện người dùng)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#backend">2. Backend (Máy chủ và xử lý dữ liệu)</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#database">3. Cơ sở dữ liệu</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#api">4. API và Tích hợp dịch vụ</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#devops">5. DevOps và Triển khai</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#security">6. Bảo mật</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#testing">7. Testing và Debugging</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#optimization">8. Performance Optimization</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#authentication">9. User Authentication & Authorization</a>
    `;
  } else if (sectionId === 'student-info') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>${currentName}</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#academic-info">Thông tin học tập</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#skills-info">Kĩ năng</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#projects-info">Dự án</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#hobbies-info">Sở thích</a>
    `;
  } else if (sectionId === 'student-info-2') {
    sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>${currentName}</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#academic-info-2">Thông tin học tập</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#skills-info-2">Kĩ năng</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#projects-info-2">Dự án</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#hobbies-info-2">Sở thích</a>
    `;
  }

  // Add active class to clicked button
  event.target.classList.add('active');
}

// Thêm biến đếm toàn cục
let newContentCounter = 1;

function addContent(id) {
  // Tạo ID mới cho mục mới
  const newId = 'content-' + Date.now();
  const newContentName = `Nội dung mới ${newContentCounter}`;
  newContentCounter++;
  
  // Thêm row mới vào bảng admin ngay sau row được chọn
  const row = document.querySelector(`button[onclick="addContent('${id}')"]`).closest('tr');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${newContentName}</td>
    <td><button onclick="viewContent('${newId}')" class="action-btn"><i class="far fa-eye"></i></button></td>
    <td><button onclick="editContent('${newId}')" class="action-btn"><i class="far fa-edit"></i></button></td>
    <td><button onclick="deleteContent('${newId}')" class="action-btn"><i class="far fa-trash-alt"></i></button></td>
    <td><button onclick="addContent('${newId}')" class="action-btn"><i class="fas fa-plus"></i></button></td>
  `;
  row.insertAdjacentElement('afterend', newRow);

  // Thêm link mới vào navigation bar ngay sau link được chọn
  const navBar = document.querySelector('.w3-bar.w3-theme.w3-large');
  const navLinks = Array.from(navBar.children);
  const currentNavLink = navLinks.find(link => {
    const onclickAttr = link.getAttribute('onclick');
    return onclickAttr && onclickAttr.includes(`showContent('${id}')`);
  });

  if (currentNavLink) {
    const newNavLink = document.createElement('a');
    newNavLink.href = 'javascript:void(0)';
    newNavLink.setAttribute('onclick', `showContent('${newId}')`);
    newNavLink.className = 'w3-bar-item w3-button';
    newNavLink.textContent = newContentName;
    currentNavLink.insertAdjacentElement('afterend', newNavLink);
  }

  // Tạo section mới
  const mainContent = document.getElementById('content-container');
  const newSection = document.createElement('div');
  newSection.id = newId;
  newSection.className = 'w3-container w3-padding-64 hidden';
  newSection.innerHTML = `
    <div class="container">
      <div class="header">${newContentName}</div>
      <div class="content">
        <p>Đây là nội dung mới được thêm vào.</p>
      </div>
    </div>
  `;
  
  // Thêm section mới vào sau section hiện tại
  const currentSection = document.getElementById(id);
  if (currentSection && currentSection.nextElementSibling) {
    currentSection.parentNode.insertBefore(newSection, currentSection.nextElementSibling);
  } else {
    mainContent.appendChild(newSection);
  }

  // Cập nhật sidebar cho section mới
  const sidebar = document.getElementById('mySidebar');
  sidebar.innerHTML = `
    <h4 class="w3-bar-item"><b>${newContentName}</b></h4>
    <a class="w3-bar-item w3-button w3-hover-black" href="#section1">Phần 1</a>
    <a class="w3-bar-item w3-button w3-hover-black" href="#section2">Phần 2</a>
  `;

  // Chuyển đến section mới
  showContent(newId);
}

function deleteContent(id) {
  if (confirm('Bạn có chắc chắn muốn xóa nội dung này?')) {
    // Xóa item khỏi bảng admin
    const row = document.querySelector(`button[onclick="deleteContent('${id}')"]`).closest('tr');
    row.remove();
    
    // Xóa item khỏi navigation bar
    const navLink = document.querySelector(`a[onclick="showContent('${id}')"]`);
    if (navLink) {
      navLink.remove();
    }
    
    // Ẩn section tương ứng
    const section = document.getElementById(id);
    if (section) {
      section.remove();
    }
    
    // Nếu đang ở section bị xóa, chuyển về trang chủ
    const currentSection = document.querySelector('.w3-container:not(.hidden)');
    if (currentSection && currentSection.id === id) {
      showContent('courseInfo');
    }
    
    // Cập nhật sidebar
    const sidebar = document.getElementById('mySidebar');
    if (sidebar.querySelector(`a[href="#${id}"]`)) {
      sidebar.innerHTML = `
        <h4 class="w3-bar-item"><b>Menu</b></h4>
        <a class="w3-bar-item w3-button w3-hover-black" href="#classInfo">Thông tin khai giảng</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#seminar">Thông tin Seminar</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#company">Thông tin công ty quan tâm</a>
      `;
    }
  }
}

function viewContent(id) {
  // Lấy tên của mục từ bảng admin
  const row = document.querySelector(`button[onclick="viewContent('${id}')"]`).closest('tr');
  const contentName = row.cells[0].textContent;

  // Tạo section mới cho admin view
  const adminViewId = `admin-view-${id}`;
  let adminSection = document.getElementById(adminViewId);
  
  if (!adminSection) {
    adminSection = document.createElement('div');
    adminSection.id = adminViewId;
    adminSection.className = 'w3-container w3-padding-64 hidden';
    
    // Xác định các submenu dựa vào id
    let subMenus = [];
    if (id === 'courseInfo') {
      subMenus = [
        { id: 'classInfo', name: 'Thông tin khai giảng' },
        { id: 'seminar', name: 'Thông tin Seminar' },
        { id: 'company', name: 'Thông tin công ty quan tâm' }
      ];
    } else if (id === 'info') {
      subMenus = [
        { id: 'summaryVN', name: 'Mô tả tóm tắt học phần (tiếng Việt)' },
        { id: 'summaryEN', name: 'Mô tả tóm tắt học phần (tiếng Anh)' },
        { id: 'contentVN', name: 'Nội dung tóm tắt học phần (tiếng Việt)' },
        { id: 'contentEN', name: 'Nội dung tóm tắt học phần (tiếng Anh)' },
        { id: 'reference', name: 'Sách tham khảo' }
      ];
    } else if (id === 'web-tech') {
      subMenus = [
        { id: 'frontend', name: '1. Frontend (Giao diện người dùng)' },
        { id: 'backend', name: '2. Backend (Máy chủ và xử lý dữ liệu)' },
        { id: 'database', name: '3. Cơ sở dữ liệu' },
        { id: 'api', name: '4. API và Tích hợp dịch vụ' },
        { id: 'devops', name: '5. DevOps và Triển khai' },
        { id: 'security', name: '6. Bảo mật' },
        { id: 'testing', name: '7. Testing và Debugging' },
        { id: 'optimization', name: '8. Performance Optimization' },
        { id: 'authentication', name: '9. User Authentication & Authorization' }
      ];
    } else if (id === 'student-info') {
      subMenus = [
        { id: 'academic-info', name: 'Thông tin học tập' },
        { id: 'skills-info', name: 'Kĩ năng' },
        { id: 'projects-info', name: 'Dự án' },
        { id: 'hobbies-info', name: 'Sở thích' }
      ];
    } else if (id === 'student-info-2') {
      subMenus = [
        { id: 'academic-info-2', name: 'Thông tin học tập' },
        { id: 'skills-info-2', name: 'Kĩ năng' },
        { id: 'projects-info-2', name: 'Dự án' },
        { id: 'hobbies-info-2', name: 'Sở thích' }
      ];
    }

    // Tạo nội dung cho section
    adminSection.innerHTML = `
      <div class="container">
        <div class="header">Admin menu left: ${contentName}</div>
        <table class="table-info admin-table">
          <thead>
            <tr>
              <th>Tên nội dung</th>
              <th>View</th>
              <th>Sửa</th>
              <th>Xóa</th>
              <th>Thêm</th>
            </tr>
          </thead>
          <tbody>
            ${subMenus.map(menu => `
              <tr>
                <td>${menu.name}</td>
                <td><button onclick="viewSubContent('${id}', '${menu.id}')" class="action-btn"><i class="far fa-eye"></i></button></td>
                <td><button onclick="editSubContent('${id}', '${menu.id}')" class="action-btn"><i class="far fa-edit"></i></button></td>
                <td><button onclick="deleteSubContent('${id}', '${menu.id}')" class="action-btn"><i class="far fa-trash-alt"></i></button></td>
                <td><button onclick="addSubContent('${id}', '${menu.id}')" class="action-btn"><i class="fas fa-plus"></i></button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    document.getElementById('content-container').appendChild(adminSection);
  }

  // Cập nhật sidebar để giống với sidebar của trang gốc
  const sidebar = document.getElementById('mySidebar');
  if (id === 'courseInfo') {
    sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Trang chủ</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#classInfo">Thông tin khai giảng</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#seminar">Thông tin Seminar</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#company">Thông tin công ty quan tâm</a>
    `;
  } else if (id === 'info') {
    sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Thông tin môn học</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#summaryVN">Mô tả tóm tắt học phần (tiếng Việt) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#summaryEN">Mô tả tóm tắt học phần (tiếng Anh) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#contentVN">Nội dung tóm tắt học phần (tiếng Việt) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#contentEN">Nội dung tóm tắt học phần (tiếng Anh) (*)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#reference">Sách tham khảo</a>
    `;
  } else if (id === 'web-tech') {
    sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Công nghệ Web</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#frontend">1. Frontend (Giao diện người dùng)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#backend">2. Backend (Máy chủ và xử lý dữ liệu)</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#database">3. Cơ sở dữ liệu</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#api">4. API và Tích hợp dịch vụ</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#devops">5. DevOps và Triển khai</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#security">6. Bảo mật</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#testing">7. Testing và Debugging</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#optimization">8. Performance Optimization</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#authentication">9. User Authentication & Authorization</a>
    `;
  } else if (id === 'student-info') {
    sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Thông tin sinh viên</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#academic-info">Thông tin học tập</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#skills-info">Kĩ năng</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#projects-info">Dự án</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#hobbies-info">Sở thích</a>
    `;
  } else if (id === 'student-info-2') {
    sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>Thông tin sinh viên 2</b></h4>
      <a class="w3-bar-item w3-button w3-hover-black" href="#academic-info-2">Thông tin học tập</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#skills-info-2">Kĩ năng</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#projects-info-2">Dự án</a>
      <a class="w3-bar-item w3-button w3-hover-black" href="#hobbies-info-2">Sở thích</a>
    `;
  }

  // Hiển thị section mới và ẩn các section khác
  document.querySelectorAll('.w3-container').forEach(section => section.classList.add('hidden'));
  adminSection.classList.remove('hidden');
}

// Thêm biến đếm cho submenu
let newSubContentCounter = 1;

function editSubContent(parentId, subId) {
  // Tìm row của submenu
  const row = document.querySelector(`button[onclick="editSubContent('${parentId}', '${subId}')"]`).closest('tr');
  const currentName = row.cells[0].textContent;
  
  // Tạo input để edit
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentName;
  input.style.width = '100%';
  input.style.padding = '5px';
  
  // Thay thế text bằng input
  row.cells[0].textContent = '';
  row.cells[0].appendChild(input);
  
  // Focus vào input
  input.focus();
  
  function handleEdit(e) {
    if (e.type === 'keyup' && e.key !== 'Enter') return;
    
    const newName = input.value.trim();
    if (newName) {
      // Cập nhật tên trong bảng
      row.cells[0].textContent = newName;
      
      // Cập nhật sidebar
      const sidebarLink = document.querySelector(`a[href="#${subId}"]`);
      if (sidebarLink) {
        sidebarLink.textContent = newName;
      }
    } else {
      row.cells[0].textContent = currentName;
    }
    
    input.removeEventListener('blur', handleEdit);
    input.removeEventListener('keyup', handleEdit);
  }
  
  input.addEventListener('blur', handleEdit);
  input.addEventListener('keyup', handleEdit);
}

function deleteSubContent(parentId, subId) {
  if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
    // Xóa row từ bảng
    const row = document.querySelector(`button[onclick="deleteSubContent('${parentId}', '${subId}')"]`).closest('tr');
    row.remove();
    
    // Xóa link từ sidebar
    const sidebarLink = document.querySelector(`a[href="#${subId}"]`);
    if (sidebarLink) {
      sidebarLink.remove();
    }
  }
}

function addSubContent(parentId, subId) {
  // Tạo ID mới cho submenu
  const newSubId = `subcontent-${Date.now()}`;
  const newSubName = `Nội dung mới ${newSubContentCounter}`;
  newSubContentCounter++;
  
  // Thêm row mới vào bảng
  const row = document.querySelector(`button[onclick="addSubContent('${parentId}', '${subId}')"]`).closest('tr');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${newSubName}</td>
    <td><button onclick="viewSubContent('${parentId}', '${newSubId}')" class="action-btn"><i class="far fa-eye"></i></button></td>
    <td><button onclick="editSubContent('${parentId}', '${newSubId}')" class="action-btn"><i class="far fa-edit"></i></button></td>
    <td><button onclick="deleteSubContent('${parentId}', '${newSubId}')" class="action-btn"><i class="far fa-trash-alt"></i></button></td>
    <td><button onclick="addSubContent('${parentId}', '${newSubId}')" class="action-btn"><i class="fas fa-plus"></i></button></td>
  `;
  row.insertAdjacentElement('afterend', newRow);

  // Thêm link mới vào sidebar
  const sidebarLink = document.querySelector(`a[href="#${subId}"]`);
  if (sidebarLink) {
    const newSidebarLink = document.createElement('a');
    newSidebarLink.href = `#${newSubId}`;
    newSidebarLink.className = 'w3-bar-item w3-button w3-hover-black';
    newSidebarLink.textContent = newSubName;
    sidebarLink.insertAdjacentElement('afterend', newSidebarLink);
  }
}

function viewSubContent(parentId, subId) {
  // Lấy tên của parent section và submenu
  const parentRow = document.querySelector(`button[onclick="viewContent('${parentId}')"]`).closest('tr');
  const parentName = parentRow.cells[0].textContent;
  
  const subRow = document.querySelector(`button[onclick="viewSubContent('${parentId}', '${subId}')"]`).closest('tr');
  const subName = subRow.cells[0].textContent;

  // Tạo ID cho admin content layout view
  const adminLayoutId = `admin-layout-${parentId}-${subId}`;
  let adminLayoutSection = document.getElementById(adminLayoutId);

  if (!adminLayoutSection) {
    // Xác định tên mặc định dựa vào subId
    let defaultItemName;
    if (subId === 'classInfo') {
      defaultItemName = 'Thông tin khai giảng 1';
    } else if (subId === 'seminar') {
      defaultItemName = 'Thông tin seminar 1';
    } else if (subId === 'company') {
      defaultItemName = 'Thông tin công ty 1';
    } else if (subId === 'summaryVN') {
      defaultItemName = 'Mô tả tiếng Việt 1';
    } else if (subId === 'summaryEN') {
      defaultItemName = 'Mô tả tiếng Anh 1';
    } else if (subId === 'contentVN') {
      defaultItemName = 'Nội dung tiếng Việt 1';
    } else if (subId === 'contentEN') {
      defaultItemName = 'Nội dung tiếng Anh 1';
    } else if (subId === 'reference') {
      defaultItemName = 'Sách tham khảo 1';
    } else if (subId === 'frontend') {
      defaultItemName = 'Frontend 1';
    } else if (subId === 'backend') {
      defaultItemName = 'Backend 1';
    } else if (subId === 'database') {
      defaultItemName = 'Database 1';
    } else if (subId === 'api') {
      defaultItemName = 'API 1';
    } else if (subId === 'devops') {
      defaultItemName = 'DevOps 1';
    } else if (subId === 'security') {
      defaultItemName = 'Security 1';
    } else if (subId === 'testing') {
      defaultItemName = 'Testing 1';
    } else if (subId === 'optimization') {
      defaultItemName = 'Optimization 1';
    } else if (subId === 'authentication') {
      defaultItemName = 'Authentication 1';
    } else if (subId === 'academic-info') {
      defaultItemName = 'Thông tin học tập 1';
    } else if (subId === 'skills-info') {
      defaultItemName = 'Kĩ năng 1';
    } else if (subId === 'projects-info') {
      defaultItemName = 'Dự án 1';
    } else if (subId === 'hobbies-info') {
      defaultItemName = 'Sở thích 1';
    } else if (subId === 'academic-info-2') {
      defaultItemName = 'Thông tin học tập 1';
    } else if (subId === 'skills-info-2') {
      defaultItemName = 'Kĩ năng 1';
    } else if (subId === 'projects-info-2') {
      defaultItemName = 'Dự án 1';
    } else if (subId === 'hobbies-info-2') {
      defaultItemName = 'Sở thích 1';
    }

    adminLayoutSection = document.createElement('div');
    adminLayoutSection.id = adminLayoutId;
    adminLayoutSection.className = 'w3-container w3-padding-64 hidden';
    
    adminLayoutSection.innerHTML = `
      <div class="container">
        <div class="header">Admin contents layout: "${parentName}/${subName}"</div>
        
        <!-- Bảng quản lý nội dung -->
        <table class="table-info admin-table">
          <thead>
            <tr>
              <th>Tên nội dung</th>
              <th>View</th>
              <th>Sửa</th>
              <th>Xóa</th>
              <th>Thêm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${defaultItemName}</td>
              <td><button onclick="viewLayoutContent('${parentId}', '${subId}', 'default')" class="action-btn"><i class="far fa-eye"></i></button></td>
              <td><button onclick="editLayoutContent('${parentId}', '${subId}', 'default')" class="action-btn"><i class="far fa-edit"></i></button></td>
              <td><button onclick="deleteLayoutContent('${parentId}', '${subId}', 'default')" class="action-btn"><i class="far fa-trash-alt"></i></button></td>
              <td><button onclick="addLayoutContent('${parentId}', '${subId}', 'default')" class="action-btn"><i class="fas fa-plus"></i></button></td>
            </tr>
          </tbody>
        </table>

        <!-- Grid header -->
        <div class="seminar-header">${subName}</div>
        <!-- Grid container -->
        <div class="seminar-grid" id="seminarGrid-${adminLayoutId}">
          <div class="seminar-item">
            <div class="seminar-title">${defaultItemName}</div>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('content-container').appendChild(adminLayoutSection);

    // Cập nhật style
    const style = document.createElement('style');
    style.textContent = `
      .seminar-header {
        background: #ffc107;
        color: white;
        padding: 10px;
        font-weight: bold;
        margin: 20px 20px 0 20px;
      }
      
      .seminar-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1px;
        padding: 20px;
        background: white;
        margin: 0 20px;
      }
      
      .seminar-item {
        border: 1px solid #ddd;
        background: white;
      }
      
      .seminar-title {
        padding: 15px;
        background: white;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
      }

      .content-preview {
        padding: 15px;
        min-height: 100px;
      }
    `;
    document.head.appendChild(style);
  }

  // Hiển thị admin layout và ẩn các section khác
  document.querySelectorAll('.w3-container').forEach(section => section.classList.add('hidden'));
  adminLayoutSection.classList.remove('hidden');

  // Chỉ highlight item tương ứng trong sidebar hiện tại
  const sidebarLinks = document.querySelectorAll('.w3-sidebar a');
  sidebarLinks.forEach(link => link.classList.remove('active'));
  
  const targetLink = document.querySelector(`a[href="#${subId}"]`);
  if (targetLink) {
    targetLink.classList.add('active');
  }
}

// Thêm các hàm xử lý cho bảng quản lý trong layout
function viewLayoutContent(parentId, subId, contentId) {
  // Lấy tên của parent, submenu và content item
  const parentRow = document.querySelector(`button[onclick="viewContent('${parentId}')"]`).closest('tr');
  const parentName = parentRow.cells[0].textContent;
  
  const subRow = document.querySelector(`button[onclick="viewSubContent('${parentId}', '${subId}')"]`).closest('tr');
  const subName = subRow.cells[0].textContent;
  
  const contentRow = document.querySelector(`button[onclick="viewLayoutContent('${parentId}', '${subId}', '${contentId}')"]`).closest('tr');
  const contentName = contentRow.cells[0].textContent;

  // Tạo ID cho content view
  const contentViewId = `content-view-${parentId}-${subId}-${contentId}`;
  let contentViewSection = document.getElementById(contentViewId);

  if (!contentViewSection) {
    contentViewSection = document.createElement('div');
    contentViewSection.id = contentViewId;
    contentViewSection.className = 'w3-container w3-padding-64 hidden';
    
    contentViewSection.innerHTML = `
      <div class="container">
        <div class="header">Admin contents: "${parentName}/${subName}/${contentName}"</div>
        
        <!-- Content Editor -->
        <div class="content-editor">
          <h3>Chỉnh sửa nội dung</h3>
          <textarea id="contentEditor-${contentViewId}" 
                    class="content-textarea" 
                    onkeyup="updatePreview('${contentViewId}')"
                    placeholder="Nhập nội dung HTML ở đây..."
          ></textarea>
        </div>

        <!-- Preview Section -->
        <div class="preview-section">
          <h3>Xem trước</h3>
          <!-- Grid header -->
          <div class="seminar-header">${contentName}</div>
          <!-- Grid container -->
          <div class="seminar-grid">
            <div class="seminar-item">
              <div id="contentPreview-${contentViewId}" class="content-preview"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.getElementById('content-container').appendChild(contentViewSection);

    // Thêm style cho editor và preview
    const style = document.createElement('style');
    style.textContent = `
      .content-editor {
        margin: 20px;
        padding: 20px;
        background: #f5f5f5;
        border-radius: 4px;
      }

      .content-textarea {
        width: 100%;
        min-height: 200px;
        padding: 10px;
        margin-top: 10px;
        font-family: monospace;
        border: 1px solid #ddd;
        border-radius: 4px;
        resize: vertical;
      }

      .preview-section {
        margin: 20px;
      }

      .content-preview {
        margin-top: 15px;
        padding: 15px;
        background: white;
        border-radius: 4px;
      }

      .seminar-header {
        background: #ffc107;
        color: white;
        padding: 10px;
        font-weight: bold;
        margin: 20px 20px 0 20px;
      }
      
      .seminar-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1px;
        padding: 0 20px 20px 20px;
        border: 1px solid #ddd;
        border-top: none;
      }
      
      .seminar-item {
        border: 1px solid #ddd;
        min-height: 100px;
        padding: 15px;
        background: white;
      }
      
      .seminar-title {
        padding: 15px;
        background: white;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);

    // Load nội dung đã lưu (nếu có)
    loadSavedContent(contentViewId);
  }

  // Hiển thị content view và ẩn các section khác
  document.querySelectorAll('.w3-container').forEach(section => section.classList.add('hidden'));
  contentViewSection.classList.remove('hidden');

  // Cập nhật sidebar để giống với Admin contents layout
  const sidebar = document.getElementById('mySidebar');
  if (sidebar) {
    // Xác định các submenu dựa vào parentId
    let subMenus = [];
    if (parentId === 'courseInfo') {
      subMenus = [
        { id: 'classInfo', name: 'Thông tin khai giảng' },
        { id: 'seminar', name: 'Thông tin Seminar' },
        { id: 'company', name: 'Thông tin công ty quan tâm' }
      ];
    } else if (parentId === 'info') {
      subMenus = [
        { id: 'summaryVN', name: 'Mô tả tóm tắt học phần (tiếng Việt)' },
        { id: 'summaryEN', name: 'Mô tả tóm tắt học phần (tiếng Anh)' },
        { id: 'contentVN', name: 'Nội dung tóm tắt học phần (tiếng Việt)' },
        { id: 'contentEN', name: 'Nội dung tóm tắt học phần (tiếng Anh)' },
        { id: 'reference', name: 'Sách tham khảo' }
      ];
    } else if (parentId === 'web-tech') {
      subMenus = [
        { id: 'frontend', name: '1. Frontend (Giao diện người dùng)' },
        { id: 'backend', name: '2. Backend (Máy chủ và xử lý dữ liệu)' },
        { id: 'database', name: '3. Cơ sở dữ liệu' },
        { id: 'api', name: '4. API và Tích hợp dịch vụ' },
        { id: 'devops', name: '5. DevOps và Triển khai' },
        { id: 'security', name: '6. Bảo mật' },
        { id: 'testing', name: '7. Testing và Debugging' },
        { id: 'optimization', name: '8. Performance Optimization' },
        { id: 'authentication', name: '9. User Authentication & Authorization' }
      ];
    } else if (parentId === 'student-info') {
      subMenus = [
        { id: 'academic-info', name: 'Thông tin học tập' },
        { id: 'skills-info', name: 'Kĩ năng' },
        { id: 'projects-info', name: 'Dự án' },
        { id: 'hobbies-info', name: 'Sở thích' }
      ];
    } else if (parentId === 'student-info-2') {
      subMenus = [
        { id: 'academic-info-2', name: 'Thông tin học tập' },
        { id: 'skills-info-2', name: 'Kĩ năng' },
        { id: 'projects-info-2', name: 'Dự án' },
        { id: 'hobbies-info-2', name: 'Sở thích' }
      ];
    }

    // Tạo sidebar HTML
    sidebar.innerHTML = `
      <h4 class="w3-bar-item"><b>${subName}</b></h4>
      ${subMenus.map(menu => `
        <a class="w3-bar-item w3-button w3-hover-black" href="#${menu.id}">${menu.name}</a>
      `).join('')}
    `;

    // Highlight item hiện tại
    const currentLink = sidebar.querySelector(`a[href="#${subId}"]`);
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }

  // Sau khi load saved content, đảm bảo nội dung cũng được hiển thị trong menu chính
  const savedContent = localStorage.getItem(`content-${contentViewId}`);
  if (savedContent) {
    updateMainMenuContent(parentId, subId, contentId, savedContent);
  }
}

function editLayoutContent(parentId, subId, contentId) {
  const row = document.querySelector(`button[onclick="editLayoutContent('${parentId}', '${subId}', '${contentId}')"]`).closest('tr');
  const currentName = row.cells[0].textContent;
  
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentName;
  input.style.width = '100%';
  input.style.padding = '5px';
  
  row.cells[0].textContent = '';
  row.cells[0].appendChild(input);
  
  input.focus();
  
  function handleEdit(e) {
    if (e.type === 'keyup' && e.key !== 'Enter') return;
    
    const newName = input.value.trim();
    if (newName) {
      row.cells[0].textContent = newName;
      
      // Cập nhật tên trong grid
      const adminLayoutId = `admin-layout-${parentId}-${subId}`;
      const grid = document.getElementById(`seminarGrid-${adminLayoutId}`);
      if (grid) {
        const items = grid.querySelectorAll('.seminar-item');
        items.forEach(item => {
          if (item.querySelector('.seminar-title').textContent === currentName) {
            item.querySelector('.seminar-title').textContent = newName;
          }
        });
      }
    } else {
      row.cells[0].textContent = currentName;
    }
    
    input.removeEventListener('blur', handleEdit);
    input.removeEventListener('keyup', handleEdit);
  }
  
  input.addEventListener('blur', handleEdit);
  input.addEventListener('keyup', handleEdit);
}

function deleteLayoutContent(parentId, subId, contentId) {
  if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
    const row = document.querySelector(`button[onclick="deleteLayoutContent('${parentId}', '${subId}', '${contentId}')"]`).closest('tr');
    const contentName = row.cells[0].textContent;
    row.remove();

    // Xóa khỏi grid
    const adminLayoutId = `admin-layout-${parentId}-${subId}`;
    const grid = document.getElementById(`seminarGrid-${adminLayoutId}`);
    if (grid) {
      const items = grid.querySelectorAll('.seminar-item');
      items.forEach(item => {
        if (item.querySelector('.seminar-title').textContent === contentName) {
          item.remove();
        }
      });
    }
  }
}

let layoutContentCounter = 1;

function addLayoutContent(parentId, subId, contentId) {
  const newContentId = `layout-content-${Date.now()}`;
  
  // Xác định prefix cho tên mới dựa vào subId
  let newContentPrefix;
  if (subId === 'classInfo') {
    newContentPrefix = 'Thông tin khai giảng';
  } else if (subId === 'seminar') {
    newContentPrefix = 'Thông tin seminar';
  } else if (subId === 'company') {
    newContentPrefix = 'Thông tin công ty';
  } else if (subId === 'summaryVN') {
    newContentPrefix = 'Mô tả tiếng Việt';
  } else if (subId === 'summaryEN') {
    newContentPrefix = 'Mô tả tiếng Anh';
  } else if (subId === 'contentVN') {
    newContentPrefix = 'Nội dung tiếng Việt';
  } else if (subId === 'contentEN') {
    newContentPrefix = 'Nội dung tiếng Anh';
  } else if (subId === 'reference') {
    newContentPrefix = 'Sách tham khảo';
  } else if (subId === 'frontend') {
    newContentPrefix = 'Frontend';
  } else if (subId === 'backend') {
    newContentPrefix = 'Backend';
  } else if (subId === 'database') {
    newContentPrefix = 'Database';
  } else if (subId === 'api') {
    newContentPrefix = 'API';
  } else if (subId === 'devops') {
    newContentPrefix = 'DevOps';
  } else if (subId === 'security') {
    newContentPrefix = 'Security';
  } else if (subId === 'testing') {
    newContentPrefix = 'Testing';
  } else if (subId === 'optimization') {
    newContentPrefix = 'Optimization';
  } else if (subId === 'authentication') {
    newContentPrefix = 'Authentication';
  } else if (subId === 'academic-info') {
    newContentPrefix = 'Thông tin học tập';
  } else if (subId === 'skills-info') {
    newContentPrefix = 'Kĩ năng';
  } else if (subId === 'projects-info') {
    newContentPrefix = 'Dự án';
  } else if (subId === 'hobbies-info') {
    newContentPrefix = 'Sở thích';
  } else if (subId === 'academic-info-2') {
    newContentPrefix = 'Thông tin học tập';
  } else if (subId === 'skills-info-2') {
    newContentPrefix = 'Kĩ năng';
  } else if (subId === 'projects-info-2') {
    newContentPrefix = 'Dự án';
  } else if (subId === 'hobbies-info-2') {
    newContentPrefix = 'Sở thích';
  }

  const newContentName = `${newContentPrefix} ${layoutContentCounter + 1}`;
  layoutContentCounter++;
  
  // Thêm vào bảng
  const row = document.querySelector(`button[onclick="addLayoutContent('${parentId}', '${subId}', '${contentId}')"]`).closest('tr');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${newContentName}</td>
    <td><button onclick="viewLayoutContent('${parentId}', '${subId}', '${newContentId}')" class="action-btn"><i class="far fa-eye"></i></button></td>
    <td><button onclick="editLayoutContent('${parentId}', '${subId}', '${newContentId}')" class="action-btn"><i class="far fa-edit"></i></button></td>
    <td><button onclick="deleteLayoutContent('${parentId}', '${subId}', '${newContentId}')" class="action-btn"><i class="far fa-trash-alt"></i></button></td>
    <td><button onclick="addLayoutContent('${parentId}', '${subId}', '${newContentId}')" class="action-btn"><i class="fas fa-plus"></i></button></td>
  `;
  row.insertAdjacentElement('afterend', newRow);

  // Thêm vào grid
  const adminLayoutId = `admin-layout-${parentId}-${subId}`;
  const grid = document.getElementById(`seminarGrid-${adminLayoutId}`);
  if (grid) {
    const newItem = document.createElement('div');
    newItem.className = 'seminar-item';
    newItem.innerHTML = `
      <div class="seminar-title">${newContentName}</div>
    `;
    grid.appendChild(newItem);
  }
}

// Thêm hàm hỗ trợ để quay lại view admin
function returnToAdminView(parentId) {
  viewContent(parentId);
}

// Thêm hàm xử lý lưu thay đổi
function saveContentLayout(parentId, subId) {
  // Xử lý lưu thay đổi ở đây
  alert('Đã lưu thay đổi thành công!');
  returnToAdminView(parentId);
}

// Thêm hàm xử lý hủy thay đổi
function cancelContentLayout(parentId, subId) {
  if (confirm('Bạn có chắc chắn muốn hủy các thay đổi?')) {
    returnToAdminView(parentId);
  }
}

// Hàm cập nhật preview khi người dùng nhập nội dung
function updatePreview(contentViewId) {
  const editor = document.getElementById(`contentEditor-${contentViewId}`);
  const preview = document.getElementById(`contentPreview-${contentViewId}`);
  
  if (editor && preview) {
    const newContent = editor.value;
    preview.innerHTML = newContent;
    
    // Lưu nội dung vào localStorage
    localStorage.setItem(`content-${contentViewId}`, newContent);

    // Lấy thông tin về item đang được edit
    const [, parentId, subId, contentId] = contentViewId.split('-');
    
    // Cập nhật nội dung trong menu chính
    updateMainMenuContent(parentId, subId, contentId, newContent);
  }
}

// Hàm cập nhật nội dung trong menu chính
function updateMainMenuContent(parentId, subId, contentId, newContent) {
  // Tìm section chính tương ứng
  const mainSection = document.getElementById(parentId);
  if (!mainSection) return;

  // Tìm subsection tương ứng
  const subSection = mainSection.querySelector(`#${subId}`);
  if (!subSection) return;

  // Lấy grid từ Admin contents layout
  const adminLayoutId = `admin-layout-${parentId}-${subId}`;
  const adminLayoutSection = document.getElementById(adminLayoutId);
  if (!adminLayoutSection) return;

  const gridHeader = adminLayoutSection.querySelector('.seminar-header');
  const gridContainer = adminLayoutSection.querySelector('.seminar-grid');
  
  if (gridHeader && gridContainer) {
    // Xóa nội dung cũ của subsection
    subSection.innerHTML = '';
    
    // Clone grid header và container từ admin layout
    const newHeader = gridHeader.cloneNode(true);
    const newGrid = gridContainer.cloneNode(true);
    
    // Thêm vào subsection
    subSection.appendChild(newHeader);
    subSection.appendChild(newGrid);

    // Cập nhật nội dung cho item cụ thể trong grid
    if (newContent) {
      const contentRow = document.querySelector(`button[onclick="viewLayoutContent('${parentId}', '${subId}', '${contentId}')"]`).closest('tr');
      if (contentRow) {
        const contentName = contentRow.cells[0].textContent;
        const items = newGrid.querySelectorAll('.seminar-item');
        items.forEach(item => {
          const title = item.querySelector('.seminar-title');
          if (title && title.textContent === contentName) {
            // Tìm hoặc tạo content container
            let contentContainer = item.querySelector('.content-preview');
            if (!contentContainer) {
              contentContainer = document.createElement('div');
              contentContainer.className = 'content-preview';
              item.appendChild(contentContainer);
            }
            contentContainer.innerHTML = newContent;
          }
        });
      }
    }
  }
}

// Hàm load nội dung đã lưu
function loadSavedContent(contentViewId) {
  const editor = document.getElementById(`contentEditor-${contentViewId}`);
  const preview = document.getElementById(`contentPreview-${contentViewId}`);
  
  if (editor && preview) {
    const savedContent = localStorage.getItem(`content-${contentViewId}`);
    if (savedContent) {
      editor.value = savedContent;
      preview.innerHTML = savedContent;

      // Cập nhật menu chính khi load nội dung đã lưu
      const [, parentId, subId, contentId] = contentViewId.split('-');
      updateMainMenuContent(parentId, subId, contentId, savedContent);
    }
  }
}
