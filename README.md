# DigitalMart-Frontend

## Git Flow
- git clone https://github.com/TanLP2003/DigitalMart-Frontend.git
- git checkout -b <tên của mình>
- git push origin <nhánh của mình>

### Quy trình
- Pull thay đổi từ nhánh main về local và merge với nhánh của mình để làm việc ở mỗi ngày mới
```
git checkout main  // chuyển sang nhánh main, nhớ phải commit ở local trước khi chuyển
git pull origin main
git checkout <nhánh của mình>
git merge main
```
- Commit và đẩy code của mình lên sau mỗi ngày làm việc
```
git commit -m <message theo quy ước>
git push origin <nhánh của mình>
```
- Sau khi hoàn thành xong task, pull code lại từ main vào nhánh hiện tại, xử lý conflict (nếu có) rồi mới push lên và tạo pull request

### Quy ước
- Commit message: <issue number> <name> <message>
VD: git commit -m "#1 nguyen_van_a update order service"

### Tham khảo
- Git Command: [https://fullstack.edu.vn/blog/bo-tui-21-lenh-git-co-ban-cach-nho-giup-newdev-lam-chu-git-quan-ly-tot-ma-ngu.html](https://fullstack.edu.vn/blog/bo-tui-21-lenh-git-co-ban-cach-nho-giup-newdev-lam-chu-git-quan-ly-tot-ma-ngu.html)
- Git Flow: [https://youtu.be/vQgcl8VouLU?si=xqRLPIFA4GdMqrM-](https://youtu.be/vQgcl8VouLU?si=xqRLPIFA4GdMqrM-)