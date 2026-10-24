/* Dữ liệu mẫu — thay bằng dữ liệu thật của Racons.
   Ảnh đang dùng ảnh minh hoạ từ Unsplash; đổi thành ảnh dự án thật trong assets/img/ */
const img = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

window.RACONS = {
  // ID video YouTube cho phần video đầu trang chủ
  youtubeId: "LXb3EKWsInQ",

  categories: {
    "villa": "Villa - Biệt thự",
    "nha-pho": "Nhà phố",
    "can-ho": "Căn hộ",
    "van-phong": "Văn phòng",
  },

  // 3 dự án thiết kế nổi bật (cuộn kiểu HBA)
  featured: [
    { title: "Naraco Home", cat: "nha-pho", place: "TP. Hồ Chí Minh", year: 2026,
      style: "Phong cách Indochine", image: "/assets/img/naraco-home.jpg",
      desc: "Nhà phố 4 tầng với mặt tiền vữa vân đá ấm, ban công cong mềm và mái ngói đỏ gợi nhớ phố cũ." },
    { title: "Villa Hồ Tràm", cat: "villa", place: "Bà Rịa - Vũng Tàu", year: 2025,
      style: "Phong cách hiện đại", image: img("1613490493576-7fde63acd811", 2200),
      desc: "Biệt thự nghỉ dưỡng mở ra biển, hồ bơi tràn và không gian sống liền mạch trong – ngoài." },
    { title: "Penthouse Riverside", cat: "can-ho", place: "Thủ Đức", year: 2025,
      style: "Phong cách Minimalism", image: img("1600210492486-724fe5c67fb0", 2200),
      desc: "Căn hộ áp mái 280m² với bảng màu trung tính, ánh sáng tự nhiên và nội thất may đo." },
  ],

  // Dự án thi công (gallery kiểu Mia Design Studio)
  projects: [
    { title: "Biệt thự Thảo Điền", cat: "villa", size: "is-wide is-tall", image: img("1600596542815-ffad4c1539a9") },
    { title: "Nhà phố Gò Vấp", cat: "nha-pho", size: "is-tall", image: img("1600585154340-be6161a56a0c", 1000) },
    { title: "Căn hộ Vinhomes Central", cat: "can-ho", size: "", image: img("1600607687939-ce8a6c25118c", 1000) },
    { title: "Văn phòng Racons HQ", cat: "van-phong", size: "", image: img("1497366216548-37526070297c", 1000) },
    { title: "Căn hộ Masteri", cat: "can-ho", size: "", image: img("1618221195710-dd6b41faaea6", 1000) },
    { title: "Villa Đà Lạt", cat: "villa", size: "is-wide", image: img("1512917774080-9991f1c4c750") },
    { title: "Nhà phố Quận 7", cat: "nha-pho", size: "is-tall", image: img("1564013799919-ab600027ffc6", 1000) },
    { title: "Văn phòng Fintech", cat: "van-phong", size: "", image: img("1497366811353-6870744d04b2", 1000) },
    { title: "Căn hộ Sky Garden", cat: "can-ho", size: "", image: img("1616486338812-3dadae4b4ace", 1000) },
    { title: "Biệt thự Ecopark", cat: "villa", size: "is-wide", image: img("1600566753190-17f0baa2a6c3") },
    { title: "Nhà phố Phú Nhuận", cat: "nha-pho", size: "", image: img("1600047509807-ba8f99d2cdde", 1000) },
    { title: "Căn hộ Duplex", cat: "can-ho", size: "", image: img("1600121848594-d8644e57abab", 1000) },
  ],

  services: [
    { id: "noi-that", title: "Thiết kế nội thất", image: img("1586023492125-27b2c045efd7", 800),
      desc: "Không gian sống cá nhân hoá, tối ưu công năng và thẩm mỹ cho từng thành viên." },
    { id: "ngoai-that", title: "Thiết kế ngoại thất", image: img("1600585154526-990dced4db0d", 800),
      desc: "Mặt tiền, sân vườn, cảnh quan — tạo dấu ấn ngay từ cái nhìn đầu tiên." },
    { id: "kien-truc", title: "Thiết kế kiến trúc trọn gói", image: img("1503387762-592deb58ef4e", 800),
      desc: "Từ ý tưởng, phương án mặt bằng đến hồ sơ kỹ thuật kiến trúc, kết cấu, MEP." },
    { id: "xay-nha", title: "Xây nhà trọn gói", image: img("1541888946425-d81bb19240f5", 800),
      desc: "Thi công chìa khoá trao tay, minh bạch chi phí, đúng tiến độ, bảo hành dài hạn." },
  ],

  posts: [
    { title: "5 nguyên tắc chọn bảng màu cho nhà phố nhiệt đới", cat: "Cẩm nang", date: "12/10/2026",
      image: img("1600573472550-8090b5e0745e", 900),
      excerpt: "Màu sắc quyết định cảm xúc của ngôi nhà. Cùng tìm hiểu cách phối màu phù hợp khí hậu Việt Nam." },
    { title: "Phong cách Indochine: Giao thoa Đông – Tây trong nội thất", cat: "Phong cách", date: "02/10/2026",
      image: img("1615529182904-14819c35db37", 900),
      excerpt: "Gạch bông, gỗ tối màu và hoạ tiết truyền thống — bí quyết để không gian Indochine không bị nặng nề." },
    { title: "Chi phí xây nhà trọn gói 2026: Những điều cần biết", cat: "Xây dựng", date: "25/09/2026",
      image: img("1487958449943-2429e8be8625", 900),
      excerpt: "Bảng đơn giá tham khảo, các hạng mục phát sinh thường gặp và cách kiểm soát ngân sách." },
    { title: "Minimalism: Sống ít đồ, sống nhiều hơn", cat: "Phong cách", date: "18/09/2026",
      image: img("1631679706909-1844bbd07221", 900),
      excerpt: "Tối giản không phải là trống trải. Cách thiết kế căn hộ tối giản mà vẫn ấm áp." },
    { title: "Hồ sơ thiết kế gồm những gì? Đọc hiểu bản vẽ kỹ thuật", cat: "Cẩm nang", date: "08/09/2026",
      image: img("1503387762-592deb58ef4e", 900),
      excerpt: "Phối cảnh 3D, mặt bằng bố trí, hồ sơ Fitout, MEP... giải thích dễ hiểu cho chủ nhà." },
    { title: "Ánh sáng tự nhiên trong thiết kế nhà ống", cat: "Kiến trúc", date: "29/08/2026",
      image: img("1600607687644-c7171b42498f", 900),
      excerpt: "Giếng trời, lam chắn nắng và vách kính — giải pháp cho nhà phố sâu và hẹp." },
  ],

  products: [
    { name: "Sofa Mây Indochine", cat: "Sofa", price: "28.500.000đ", badge: "Mới", image: img("1586023492125-27b2c045efd7", 700) },
    { name: "Bàn ăn gỗ Óc chó", cat: "Bàn", price: "35.000.000đ", image: img("1617806118233-18e1de247200", 700) },
    { name: "Ghế thư giãn Lounge", cat: "Ghế", price: "12.800.000đ", image: img("1583608205776-bfd35f0d9f83", 700) },
    { name: "Giường ngủ Linen", cat: "Giường", price: "24.000.000đ", image: img("1505691938895-1758d7feb511", 700) },
    { name: "Tủ bếp Acrylic", cat: "Tủ", price: "Liên hệ", image: img("1556909114-f6e7ad7d3136", 700) },
    { name: "Sofa Module Minimal", cat: "Sofa", price: "42.000.000đ", badge: "Bán chạy", image: img("1618221195710-dd6b41faaea6", 700) },
    { name: "Bàn trà đá Travertine", cat: "Bàn", price: "9.600.000đ", image: img("1616486338812-3dadae4b4ace", 700) },
    { name: "Tủ trang trí Vintage", cat: "Tủ", price: "16.500.000đ", image: img("1582268611958-ebfd161ef9cf", 700) },
    { name: "Ghế ăn Bentwood", cat: "Ghế", price: "3.200.000đ", image: img("1600121848594-d8644e57abab", 700) },
    { name: "Giường Platform gỗ sồi", cat: "Giường", price: "19.900.000đ", badge: "Mới", image: img("1631679706909-1844bbd07221", 700) },
    { name: "Bàn làm việc Oak", cat: "Bàn", price: "7.800.000đ", image: img("1497366811353-6870744d04b2", 700) },
    { name: "Sofa da Cognac", cat: "Sofa", price: "55.000.000đ", image: img("1600210492486-724fe5c67fb0", 700) },
  ],
};
