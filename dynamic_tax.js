
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

function tax(payload,get){
    const {
        rate=0,
        qty=1,
        discount=0, 
        isInclusive='Y',
     taxes=[]   
    }=payload;

    var final_total_tax_percent;
    var final_subtotal;
    var each_tax=[];
    var computed_tax=[];

    var p_discount=discount==""?0:discount;
    

   var  initial_value=0;
   console.log("taxes")
   console.log(taxes)
    var total_tax= taxes.reduce((result, current_obj) =>

    { 

     return   parseFloat(result) + parseFloat(current_obj.value)}, initial_value)

     var f_discount_price;
    var final_discount_price;
    var reduce_tax;
    
    //exclusive
    
    if(isInclusive!='N'){

    var sub_total=rate*100/(100 + total_tax);
    var sub_total_qty=(sub_total*qty).toFixed(2);
     final_subtotal=isNaN(sub_total_qty)?0:sub_total_qty;
    
    var tax=((rate*total_tax/(100+total_tax))/total_tax)*qty;
    
   computed_tax =taxes.map(function callback(element, index, array) {
       element['result']=tax*element['value'];
       return element;
        // Return value for new_array
    })
    
    f_discount_price=(final_subtotal/100)*p_discount;
    
    final_discount_price=isNaN(f_discount_price)? 0 : f_discount_price;
    
    reduce_tax=(final_discount_price/100)*total_tax;//(parseFloat(cgst_input)+parseFloat(sgst_input)+parseFloat(igst_input)+parseFloat(cess_input));
    
    var total_actual_tax=((computed_tax.reduce((result, obj) => result + obj.result, initial_value))-reduce_tax).toFixed(2);
    //((cgst_in+sgst_in+igst_in+cess_in)-reduce_tax).toFixed(2);
    final_total_tax_percent=isNaN(total_actual_tax)?0:total_actual_tax;
    if(p_discount==0)
    {
 
         each_tax =computed_tax.map(function callback(element, index, array) {
            element['each_price']=isNaN(element['result'])?0:(element['result']).toFixed(3);//tax*element['value']
           return element;
            // Return value for new_array
         })
    
    }
    else{
         each_tax =computed_tax.map(function callback(element, index, array) {
            element['each_price']=(parseFloat(final_total_tax_percent)/parseFloat(total_tax)) * parseFloat(element['value']);
            return element;
            // Return value for new_array
         })


    
    
    }
    
    
    
    
    
    }
    else{
    var sub_total_qty_ex=parseFloat(rate)*qty;
    final_subtotal=isNaN(sub_total_qty_ex)?0:sub_total_qty_ex;
    
     f_discount_price=(final_subtotal/100)*p_discount;
    
     final_discount_price=isNaN(f_discount_price)? 0 : f_discount_price;
    

     reduce_tax=(final_discount_price/100)*total_tax;
    var t_tax=total_tax;  
    var tax_price=((parseFloat(final_subtotal)/100)* parseFloat(t_tax));
    var final_tax=parseFloat(((tax_price-reduce_tax)).toFixed(2));
     final_total_tax_percent=isNaN(final_tax)?0:final_tax;

    var each_discount=final_total_tax_percent/total_tax;
    
    var each_tax=tax_price/t_tax;
    if(discount==0){

         each_tax =taxes.map(function callback(element, index, array) {
            element['each_price']=parseFloat(each_tax)*parseFloat(element['value']);
            return element;
             // Return value for new_array
         })

    }
    else{
    
         each_tax =taxes.map(function callback(element, index, array) {
            element['each_price']=parseFloat((each_discount*parseFloat(element['value'])).toFixed(3));
             // Return value for new_array
             return element;
         })
    
    
    }
    
    
    
    }
    
    var each_tax_amt =each_tax.map(function callback(element, index, array) {
        element['each_tax_fianal_amt']=isNaN(element['each_price'])?0:element['each_price']//parseFloat((each_discount*element['value']).toFixed(3));
         // Return value for new_array
         return element;
     })

    
    
    var total_ammount=(parseFloat(final_total_tax_percent) + parseFloat(final_subtotal) - parseFloat(final_discount_price));
    var final_total_amount=isNaN(total_ammount)?0:parseFloat(total_ammount.toFixed(2));
    
    
 
    sales_item_calc["isInclusive"]=isInclusive;
    sales_item_calc["sales rate"]=rate;
    sales_item_calc["qty"]=qty;
    sales_item_calc["discount"]=p_discount;
     sales_item_calc["total_tax"]=final_total_tax_percent;
    sales_item_calc["taxes"]=each_tax_amt;
     sales_item_calc["sub_total"]=final_subtotal;
    sales_item_calc["final_amount"]=final_total_amount;
//console.log(sales_item_calc);
    get(sales_item_calc)
    }

    module.exports = { 

        tax
    }

