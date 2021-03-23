
var sales_item_calc={};

function gst(rate,qty,cgst,sgst,igst,cess,tax_type,discount,get){
    

    var cgst_each_price;
    var sgst_each_price
    var igst_each_price
    var cess_each_price;
    var final_total_tax_percent;
    var final_subtotal;
    
    var p_cgst=cgst==""?0:cgst;
    var p_sgst=sgst==""?0:sgst;
    var p_igst=igst==""?0:igst;
    var p_cess=cess==""?0:cess;
    var p_discount=discount==""?0:discount;
    // var p_discount_price=discount_price==""?0:discount_price;
    
    var cgst_input=p_cgst;
    var sgst_input=p_sgst;
    var igst_input=p_igst;
    var cess_input=p_cess;
    var total_tax=parseFloat(cgst_input)+parseFloat(sgst_input)+parseFloat(igst_input)+parseFloat(cess_input);
    
     var f_discount_price;
    var final_discount_price;
    var reduce_tax;
    
    //exclusive
    
    if(tax_type=="INCLUSIVE"){
    // this.isat_toast("this.purchase.total_ammount","error")
    
    //inclusive tax
    //ammount=price rate*100/(100+taxpercent)*qty
    //tax=price*taxpercent/(100+taxpercent)*qty
    //discount Price=rate/100*discount
    //reduce_tax=(discount/100)*tax(cgst+sgst+igst+cess);
    //(cgst,sgst,igst,cess)=reduce_tax/(cgst,+sgst+igst+cess)*(cgst,sgst,igst,cess)
    //gst_amount=tax_amount-reduce_tax
    //total=subtotal+gst_amount-discount price
    // var totaltax_in_percent=parseFloat(cgst_input) + parseFloat(sgst_input) +parseFloat(igst_input) + parseFloat(cess_input);
    var sub_total=rate*100/(100 + total_tax );
    var sub_total_qty=(sub_total*qty).toFixed(2);
     final_subtotal=isNaN(sub_total_qty)?0:sub_total_qty;
    
    var tax=((rate*total_tax/(100+total_tax))/total_tax)*qty;
    var cgst_in=tax*p_cgst;
    var sgst_in=tax*p_sgst;
    var igst_in=tax*p_igst;
    var cess_in=tax*p_cess;
    
    f_discount_price=(final_subtotal/100)*p_discount;
    
    final_discount_price=isNaN(f_discount_price)? 0 : f_discount_price;
    
    reduce_tax=(final_discount_price/100)*(parseFloat(cgst_input)+parseFloat(sgst_input)+parseFloat(igst_input)+parseFloat(cess_input));
    
    var total_actual_tax=((cgst_in+sgst_in+igst_in+cess_in)-reduce_tax).toFixed(2);
    final_total_tax_percent=isNaN(total_actual_tax)?0:total_actual_tax;
    if(p_discount==0)
    {
    cgst_each_price=isNaN(cgst_in)?0:(cgst_in).toFixed(3);
    sgst_each_price=isNaN(sgst_in)?0:sgst_in.toFixed(3);
    igst_each_price=isNaN(igst_in)?0:igst_in.toFixed(3);
    cess_each_price=isNaN(cess_in)?0:cess_in.toFixed(3);
    }
    else{
    cgst_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(cgst_input);
    sgst_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(sgst_input);
    igst_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(igst_input);
    cess_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(cess_input);
    
    
    }
    
    
    
    
    
    }
    else{
    var sub_total_qty_ex=parseFloat(rate)*qty;
    final_subtotal=isNaN(sub_total_qty_ex)?0:sub_total_qty_ex;
    
     f_discount_price=(final_subtotal/100)*p_discount;
    
     final_discount_price=isNaN(f_discount_price)? 0 : f_discount_price;
    
     reduce_tax=(final_discount_price/100)*(parseFloat(cgst_input)+parseFloat(sgst_input)+parseFloat(igst_input)+parseFloat(cess_input));
    
    // this.discount_price=discount;
    var t_tax=parseFloat(p_cgst) + parseFloat(p_sgst) + parseFloat(p_igst) + parseFloat(p_cess);
    var tax_price=((parseFloat(final_subtotal)/100)* parseFloat(t_tax));
    var final_tax=parseFloat(((tax_price-reduce_tax)).toFixed(2));
     final_total_tax_percent=isNaN(final_tax)?0:final_tax;
    var each_discount=final_total_tax_percent/total_tax;
    
    // this.isat_toast("this.purchase.total_ammount"+(this.purchase.tax + this.purchase.subtotal - this.discount_price),"error")
    
    var each_tax=tax_price/t_tax;
    if(discount==0){
     cgst_each_price=each_tax*p_cgst;
     sgst_each_price=each_tax*p_sgst;
     igst_each_price=each_tax*p_igst;
     cess_each_price=each_tax*p_cess;
    }
    else{
    
     cgst_each_price=parseFloat((each_discount*cgst_input).toFixed(3));
     sgst_each_price=parseFloat((each_discount*sgst_input).toFixed(3));
     igst_each_price=parseFloat((each_discount*igst_input).toFixed(3));
     cess_each_price=parseFloat((each_discount*cess_input).toFixed(3));
    
    
    
    }
    
    
    
    }
    
    var product_cgst_amt=isNaN(cgst_each_price)?0:cgst_each_price;
    var product_sgst_amt=isNaN(sgst_each_price)?0:sgst_each_price;
    var product_igst_amt=isNaN(igst_each_price)?0:igst_each_price;
    var product_cess_amt=isNaN(cgst_each_price)?0:cess_each_price;
    
    
    
    var total_ammount=(parseFloat(final_total_tax_percent) + parseFloat(final_subtotal) - parseFloat(final_discount_price));
    var final_total_ammount=isNaN(total_ammount)?0:parseFloat(total_ammount.toFixed(2));
    
    
    // alert("sub total :"+final_subtotal+"tax:"+final_total_tax_percent+"cgst :"+product_cgst_amt+"sgst"+product_sgst_amt+"igst :"+product_igst_amt+"cess"+product_cess_amt+"total"+final_total_ammount)
    sales_item_calc["tax_type"]=tax_type;
    sales_item_calc["sales rate"]=rate;
    sales_item_calc["qty"]=qty;
    sales_item_calc["discount"]=p_discount;
    sales_item_calc["sub_total"]=final_subtotal;
    sales_item_calc["total_tax"]=final_total_tax_percent;

    sales_item_calc["cgst"]=p_cgst;
    sales_item_calc["sgst"]=p_sgst;
    sales_item_calc["igst"]=p_igst;
    sales_item_calc["cess"]=p_cess;

    sales_item_calc["cgst_price"]=product_cgst_amt;
    sales_item_calc["sgst_price"]=product_sgst_amt;
    sales_item_calc["igst_price"]=p_igst;
    sales_item_calc["igst_price"]=product_igst_amt;
    
    sales_item_calc["cess_price"]=product_cess_amt;
    sales_item_calc["sub_total"]=final_subtotal;
    sales_item_calc["sub_total"]=final_subtotal;
    sales_item_calc["final ammount"]=final_total_ammount;
    
    get(sales_item_calc)
    }

    module.exports = { 

        gst
    }

