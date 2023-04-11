<?php
    /**
    *   一般產生訂單(全功能)範例
    */
    // $tmp = $_POST['tmp'];
    // if (isset($tmp)) {
    //     echo($tmp);
    // }
    // else {
    //     echo('none');
    // }
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    date_default_timezone_set("Asia/Taipei");
  
    $merchantTradeNo = $_POST["merchantTradeNo"];
    $merchantTradeDate = $_POST['merchantTradeDate'];
    $totalAmount = $_POST['totalAmount'];
    $donateListJson = $_POST['donateListJson'];
    // echo $merchantTradeNo;
    
    include 'ECPay.Payment.Integration.php';
    try {
        
        $obj = new ECPay_AllInOne();
    
        //服務參數
        $obj->ServiceURL  = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";  //服務位置
        $obj->HashKey     = '5294y06JbISpM5x9' ;                                          //測試用Hashkey，請自行帶入ECPay提供的HashKey
        $obj->HashIV      = 'v77hoKGq4kWxNNIS' ;                                          //測試用HashIV，請自行帶入ECPay提供的HashIV
        $obj->MerchantID  = '2000132';                                                    //測試用MerchantID，請自行帶入ECPay提供的MerchantID
        $obj->EncryptType = '1';                                                          //CheckMacValue加密類型，請固定填入1，使用SHA256加密


        //基本參數(請依系統規劃自行調整)
        // $merchantTradeNo = "Test".time() ;
        $obj->Send['ReturnURL']         = "http://www.ecpay.com.tw/receive.php";     //付款完成通知回傳的網址
        $obj->Send['MerchantTradeNo']   = $merchantTradeNo;                          //訂單編號
        $obj->Send['MerchantTradeDate'] = $merchantTradeDate;                       //交易時間 date('Y/m/d H:i:s')
        $obj->Send['TotalAmount']       = $totalAmount;                                       //交易金額
        $obj->Send['TradeDesc']         = "good to drink";                           //交易描述
        $obj->Send['ChoosePayment']     = ECPay_PaymentMethod::ALL;                  //付款方式:全功能
        $obj->Send['ClientBackURL'] = 'http://localhost:3000/donateList';
        $obj->Send['PaymentType'] = 'aio';

        //訂單的商品資料
        $obj->Send['ItemName'] = ['範例商品一批1 100 TWD x 1', '範例商品一批2 200 TWD x 1'];
        array_push(
            $obj->Send['Items'],
            array('Name' => "舒潔棉柔舒適捲筒衛生紙300張x6捲", 'Price' => (int)"129", 'Currency' => "元", 'Quantity' => (int) "1"),
            // array('Name' => "其他商品", 'Price' => (int)"10", 'Currency' => "元", 'Quantity' => (int) "1", 'URL' => "dedwed")
        );

        //產生訂單(auto submit至ECPay)
        $obj->CheckOut();
    } catch (Exception $e) {
        echo $e->getMessage();
    }
  

    // $inputJSON = file_get_contents('php://input');
    // $input = json_decode($inputJSON, true);
    // $data = $input['data'];
    // echo $data;


    // 載入SDK(路徑可依系統規劃自行調整)
?>