export const removeFormatMoney = (value) =>
    parseFloat(value.replace(/[R$ .]/g, "").replace(",", "."));
export const formatPhone = (phone) =>
    phone && phone.replace(/\+?(\d{2})(\d{2})(\d{3,5})(\d{4})/, "+$1 ($2) $3-$4");

export const formatMoney = (value = 0) =>
    value
        ? `R$ ${Number(value)
            .toFixed(2)
            .replace(".", ",")
            .replace(/\d(?=(\d{3})+,)/g, "$&.")}`
        : "R$ 0,00";

export const formatMoneyWOCurrency = (value) =>
    value
        ? `${Number(value)
            .toFixed(2)
            .replace(".", ",")
            .replace(/\d(?=(\d{3})+,)/g, "$&.")}`
        : "0,00";

export const formatDate = (date) =>
    date ? date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1") : "";
export const formatQuotaValue = (quota, payment, interest) => {
    if (quota) {
        return quota;
    }
    if (payment && interest) {
        return formatMoneyWOCurrency(
            removeFormatMoney(payment) + removeFormatMoney(interest)
        );
    }
    return 0;
};