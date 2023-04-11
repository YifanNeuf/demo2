<script></script>

<?php

    // 付款結果通知
    require('ECPay.Payment.Integration.php');

    try {
        // 收到綠界科技的付款結果訊息，並判斷檢查碼是否相符
        $AL = new ECPay_AllInOne();
        $AL->MerchantID = '2000132';
        $AL->HashKey = '5294y06JbISpM5x9';
        $AL->HashIV = 'v77hoKGq4kWxNNIS';
        // $AL->EncryptType = ECPay_EncryptType::ENC_MD5;  // MD5
        $AL->EncryptType = ECPay_EncryptType::ENC_SHA256; // SHA256
        $feedback = $AL->CheckOutFeedback();

        // 以付款結果訊息進行相對應的處理
        // 在網頁端回應 1|OK
        header('Location: http://localhost:3000/donateListThird');
        echo '1|OK';
    } catch(Exception $e) {
        echo '0|' . $e->getMessage();
    }
?>