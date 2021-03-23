

## Description
it is a tiny gst library for inclusive and exclusive computation
## Download and Install  iSatpl

### Install from npm

```
npm install resolve_tax --save
```

### Currently Added Features 
```
import {tax} from 'resolve_tax'
```

```
npm install resolve_gst --save
```

### Usage
```

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
tax(payload,function(result){

    console.log(result)

})
```
## Bug fixes




### We are Not Responsible for if any damage causes(dont Download without knowledge)
### Still in Developement Mode (confirm the library worth before you use)
## Licensing

- License Agreement: MIT
- Author :Balaji





