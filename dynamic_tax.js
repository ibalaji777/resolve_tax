
var sales_item_calc={};

var payload={
    rate:10,
    qty:1,
    discount:0, 
    isInclusive:'Y',
 taxes:[
     {
         name:'CGST',value:5,
     },
     {
        name:'SGST',value:15,
    },
    {
        name:'IGST',value:4,
    },
    {
        name:'other',value:4,
    }
 ]   
}

function gst(payload,get){
    const {
        rate=0,
        qty=1,
        discount=0, 
        isInclusive='Y',
     taxes=[]   
    }=payload;
    // rate,qty,cgst,sgst,igst,cess,tax_type,discount,get
    var cgst_each_price;
    var sgst_each_price
    var igst_each_price
    var cess_each_price;
    var final_total_tax_percent;
    var final_subtotal;
    var each_tax=[];
    var computed_tax=[];
    // var p_cgst=cgst==""?0:cgst;
    // var p_sgst=sgst==""?0:sgst;
    // var p_igst=igst==""?0:igst;
    // var p_cess=cess==""?0:cess;
    var p_discount=discount==""?0:discount;
    // var p_discount_price=discount_price==""?0:discount_price;
    
    // var cgst_input=p_cgst;
    // var sgst_input=p_sgst;
    // var igst_input=p_igst;
    // var cess_input=p_cess;
   var  initial_value=0;
   console.log("taxes")
   console.log(taxes)
    var total_tax= taxes.reduce((result, current_obj) =>

    { 
    //console.log("reduce")
    //console.log(result)
    //console.log(current_obj)
     return   parseFloat(result) + parseFloat(current_obj.value)}, initial_value)
       //parseFloat(cgst_input)+parseFloat(sgst_input)+parseFloat(igst_input)+parseFloat(cess_input);
   //console.log("total_tax")
   //console.log(total_tax)
     var f_discount_price;
    var final_discount_price;
    var reduce_tax;
    
    //exclusive
    
    if(isInclusive!='N'){

    var sub_total=rate*100/(100 + total_tax);
    var sub_total_qty=(sub_total*qty).toFixed(2);
     final_subtotal=isNaN(sub_total_qty)?0:sub_total_qty;
    
    var tax=((rate*total_tax/(100+total_tax))/total_tax)*qty;
    // var cgst_in=tax*p_cgst;
    // var sgst_in=tax*p_sgst;
    // var igst_in=tax*p_igst;
    // var cess_in=tax*p_cess;
//console.log(taxes);
    
   computed_tax =taxes.map(function callback(element, index, array) {
       element['result']=tax*element['value'];
       return element;
        // Return value for new_array
    })
//console.log("taxes")
//console.log(taxes)
//console.log(computed_tax)
    
    f_discount_price=(final_subtotal/100)*p_discount;
    
    final_discount_price=isNaN(f_discount_price)? 0 : f_discount_price;
    
    reduce_tax=(final_discount_price/100)*total_tax;//(parseFloat(cgst_input)+parseFloat(sgst_input)+parseFloat(igst_input)+parseFloat(cess_input));
    
    var total_actual_tax=((computed_tax.reduce((result, obj) => result + obj.result, initial_value))-reduce_tax).toFixed(2);
    //((cgst_in+sgst_in+igst_in+cess_in)-reduce_tax).toFixed(2);
    final_total_tax_percent=isNaN(total_actual_tax)?0:total_actual_tax;
    if(p_discount==0)
    {
    //console.log(computed_tax);
         each_tax =computed_tax.map(function callback(element, index, array) {
            element['each_price']=isNaN(element['result'])?0:(element['result']).toFixed(3);//tax*element['value']
           return element;
            // Return value for new_array
         })
    // cgst_each_price=isNaN(cgst_in)?0:(cgst_in).toFixed(3);
    // sgst_each_price=isNaN(sgst_in)?0:sgst_in.toFixed(3);
    // igst_each_price=isNaN(igst_in)?0:igst_in.toFixed(3);
    // cess_each_price=isNaN(cess_in)?0:cess_in.toFixed(3);
    }
    else{
         each_tax =computed_tax.map(function callback(element, index, array) {
            element['each_price']=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(element['value']);
            return element;
            // Return value for new_array
         })

        // cgst_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(cgst_input);
    // sgst_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(sgst_input);
    // igst_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(igst_input);
    // cess_each_price=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(cess_input);
    
    
    }
    
    
    
    
    
    }
    else{
    var sub_total_qty_ex=parseFloat(rate)*qty;
    final_subtotal=isNaN(sub_total_qty_ex)?0:sub_total_qty_ex;
    
     f_discount_price=(final_subtotal/100)*p_discount;
    
     final_discount_price=isNaN(f_discount_price)? 0 : f_discount_price;
    
    //  reduce_tax=(final_discount_price/100)*(parseFloat(cgst_input)+parseFloat(sgst_input)+parseFloat(igst_input)+parseFloat(cess_input));
     reduce_tax=(final_discount_price/100)*total_tax;
    // this.discount_price=discount;
    var t_tax=total_tax;  //parseFloat(p_cgst) + parseFloat(p_sgst) + parseFloat(p_igst) + parseFloat(p_cess);
    var tax_price=((parseFloat(final_subtotal)/100)* parseFloat(t_tax));
    var final_tax=parseFloat(((tax_price-reduce_tax)).toFixed(2));
     final_total_tax_percent=isNaN(final_tax)?0:final_tax;
 //console.log("final_total_tax_percent")
 //console.log(final_total_tax_percent)
    var each_discount=final_total_tax_percent/total_tax;
//console.log("each_discount")
//console.log(each_discount)
    // this.isat_toast("this.purchase.total_ammount"+(this.purchase.tax + this.purchase.subtotal - this.discount_price),"error")
    
    var each_tax=tax_price/t_tax;
    if(discount==0){

         each_tax =taxes.map(function callback(element, index, array) {
            element['each_price']=parseFloat(each_tax)*parseFloat(element['value']);
            return element;
             // Return value for new_array
         })
     //console.log("each tax");
     //console.log(each_tax)
    //  cgst_each_price=each_tax*p_cgst;
    //  sgst_each_price=each_tax*p_sgst;
    //  igst_each_price=each_tax*p_igst;
    //  cess_each_price=each_tax*p_cess;
    }
    else{
    
         each_tax =taxes.map(function callback(element, index, array) {
            element['each_price']=parseFloat((each_discount*parseFloat(element['value'])).toFixed(3));
             // Return value for new_array
             return element;
         })
    //  cgst_each_price=parseFloat((each_discount*cgst_input).toFixed(3));
    //  sgst_each_price=parseFloat((each_discount*sgst_input).toFixed(3));
    //  igst_each_price=parseFloat((each_discount*igst_input).toFixed(3));
    //  cess_each_price=parseFloat((each_discount*cess_input).toFixed(3));
    
    
    
    }
    
    
    
    }
    
    var each_tax_amt =each_tax.map(function callback(element, index, array) {
        element['each_tax_fianal_amt']=isNaN(element['each_price'])?0:element['each_price']//parseFloat((each_discount*element['value']).toFixed(3));
         // Return value for new_array
         return element;
     })
 //console.log(each_tax_amt)
    // var product_cgst_amt=isNaN(cgst_each_price)?0:cgst_each_price;
    // var product_sgst_amt=isNaN(sgst_each_price)?0:sgst_each_price;
    // var product_igst_amt=isNaN(igst_each_price)?0:igst_each_price;
    // var product_cess_amt=isNaN(cgst_each_price)?0:cess_each_price;
    
    
    
    var total_ammount=(parseFloat(final_total_tax_percent) + parseFloat(final_subtotal) - parseFloat(final_discount_price));
    var final_total_amount=isNaN(total_ammount)?0:parseFloat(total_ammount.toFixed(2));
    
    
    // alert("sub total :"+final_subtotal+"tax:"+final_total_tax_percent+"cgst :"+product_cgst_amt+"sgst"+product_sgst_amt+"igst :"+product_igst_amt+"cess"+product_cess_amt+"total"+final_total_amount)
    sales_item_calc["isInclusive"]=isInclusive;
    sales_item_calc["sales rate"]=rate;
    sales_item_calc["qty"]=qty;
    sales_item_calc["discount"]=p_discount;
    // sales_item_calc["sub_total"]=final_subtotal;
    sales_item_calc["total_tax"]=final_total_tax_percent;
    sales_item_calc["taxes"]=each_tax_amt;
    // sales_item_calc["cgst"]=p_cgst;
    // sales_item_calc["sgst"]=p_sgst;
    // sales_item_calc["igst"]=p_igst;
    // sales_item_calc["cess"]=p_cess;
    // sales_item_calc["cgst_price"]=product_cgst_amt;
    // sales_item_calc["sgst_price"]=product_sgst_amt;
    // sales_item_calc["igst_price"]=p_igst;
    // sales_item_calc["igst_price"]=product_igst_amt;    
    // sales_item_calc["cess_price"]=product_cess_amt;
    // sales_item_calc["sub_total"]=final_subtotal;
    sales_item_calc["sub_total"]=final_subtotal;
    sales_item_calc["final_amount"]=final_total_amount;
//console.log(sales_item_calc);
    get(sales_item_calc)
    }
gst(payload);
    module.exports = { 

        gst
    }

