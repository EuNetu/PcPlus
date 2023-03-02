function maskPhone(phone) {
  phone = phone.replace(/\D/g, "");
  phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
  phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");
  return phone;
}

$(".phone").blur(function (event) {
  let phoneNumber = $(this).val();
  $(this).val(maskPhone(phoneNumber));
});
