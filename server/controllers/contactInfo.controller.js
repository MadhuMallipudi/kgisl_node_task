const fs = require("file-system");

console.log("---------------------- stash ");

const contact_controller =  () => {

    const _list = async (req,res) => {
        try {
            return res.status(200).send({data: await getContactInfo() });
        } catch (ex){
            return res.status(500).send({error:ex.message});
        }
    }
    const _create = async (req,res) =>{
        try{
            let writableData = [],postData = req.body;
            let getData = fs.readFileSync(__dirname+'/../contacts_info.txt').toString();
            let contact_info = JSON.parse(getData);
            if(contact_info && contact_info.length > 0){
                let newData  =  contact_info.map((item) => { return  item.id});
                postData.id =  newData.reverse()[0] + 1;
                writableData = [...writableData,...contact_info,postData];
            } else {
                postData.id = 1;
                writableData = [...writableData,postData];
            }
            await storeData(writableData);
            return res.status(200).send({message:"saved successfully"}); 
        } catch(ex) {
            return res.status(500).send({status:500,error:ex.message});    
        }
    }

    const _delete = async (req,res) => {
        try {
            let { id }  = req.query;
            let previousResult  = await getContactInfo();
            let finalResult  = previousResult.filter((item)=> { return item.id != id });
            await storeData(finalResult);
            
            res.status(200).send({status:200,message:"deleted successfully"}); 
             
        } catch(ex) {
            res.status(500).send({error:ex});
        }
    };
    
    const _update =  async (req,res)=>{
        try {
            
            let postData =  req.body;
            let previousResult  = await getContactInfo();
            let specified_obj = previousResult.findIndex((item)=> {return item.id == postData.id});
            previousResult[specified_obj]  = postData;
            await storeData(previousResult);
            
            res.status(200).send({status:200,message:"updated successfully"}); 
    
        } catch(ex){
            res.status(500).send({error:ex});
        }
    }
    
    return {
        list: _list,
        create:_create,
        update:_update,
        delete:_delete
    }
}


module.exports = contact_controller();

async function getContactInfo() {
    let getData = fs.readFileSync(__dirname+'/../contacts_info.txt').toString();
    return JSON.parse(getData).reverse();
}

async function storeData (storedata) {
    let obj = {}
    fs.writeFile(__dirname+'/../contacts_info.txt', JSON.stringify(storedata), (err,data) => {
        if(!err){
            obj = { "status":200 ,"data":data,message:"data updated successfully" };
        } else {
            obj = {status:400,message:"failed to update","error":err};
        }
    });
    return obj; 
}