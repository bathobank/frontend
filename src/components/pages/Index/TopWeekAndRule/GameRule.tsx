export const GameRule = () => {
  return (
    <div className="p-3 h-100">
      <div
        style={{ border: "1px solid #ffffff0d" }}
        className="rounded-3 h-100"
      >
        <div className="d-flex align-items-center p-3 game-header">
          <i className="!hl-text bi bi-person-fill-gear fs-2x"></i>
          <h5 className="mb-0 ms-2 text-white">QUY ĐỊNH LUẬT CHƠI</h5>
        </div>
        <div className="p-3 d-flex flex-column gap-4">
          <span className="fs-lg">
            1. Hệ thống chẵn lẻ bank tính theo kết quả mã giao dịch của bạn nếu
            chuyển khoản cùng ngân hàng. Riêng chuyển từ vcb qua vcb sẽ tính kết
            quả là số giao dịch.
          </span>
          <span className="fs-lg">
            2. Hệ thống sử dụng mã giao dịch của bank nhận để tính kết quả trò
            chơi nếu bạn chuyển khoản liên ngân hàng.
          </span>
          <span className="fs-lg">
            3. Chuyển liên bank nội dung có thể bị ngân hàng thêm thắt hoặc thay
            đổi. HT tính theo nội dung bank HT nhận được.
          </span>
          <span className="fs-lg">
            4. Hệ thống luôn show sao kê, lịch sử của bank nhận để người chơi
            kiểm tra - xanh chín.
          </span>
          <span className="fs-lg">
            5. Hệ thống sẽ tự động đổi bank liên tục, trước khi chơi khách hàng
            vui lòng lên web tải lại trang để cập nhật.
          </span>
          <span className="fs-lg">
            6. Hệ thống trích 1% tiền cược giao dịch win cho vào hũ JACKPOT.
          </span>
          <span className="fs-lg">
            7. Chuyển khoản sai nội dung hoặc hạn mức sẽ không được hoàn tiền.
          </span>
          <span className="fs-lg">
            8. Bạn cần truy cập lại web nếu quá 12h không có hoạt động nào. Nếu
            không HT sẽ không tính nội dung của bạn.
          </span>
        </div>
      </div>
    </div>
  );
};
