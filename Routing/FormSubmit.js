const Router = require('express');
const { ModelOfForm } = require('../Model/formModel');

const submitForm = Router();

submitForm.get('/', (req, res) => {
    res.status(200).json({ success: true })
})

submitForm.post('/', async (req, res) => {
    const { vendorName, bankAccountNo, bankName, addressLine1, addressLine2, city, country, zipCode } = req.body
    try {
        const formData = ModelOfForm({
            vendorName,
            bankAccountNo,
            bankName,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode
        })
        await formData.save()
        res.status(200).json({ mssg: "form submitted successfully", formData })
    } catch (error) {
        res.status(500).json({ mssg: "error saving form" })
        console.log("Error saving", error)
    }
})


submitForm.patch('/edit/:id', async (req, res) => {
    const { vendorName, bankAccountNo, bankName, addressLine1, addressLine2, city, country, zipCode } = req.body
    const {id}=req.params;
    // console.log(id)
    try {
        await ModelOfForm.findOneAndUpdate({_id:id},{
            vendorName,
            bankAccountNo,
            bankName,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode
        })
       
        res.status(200).json({ mssg: "form updated successfully"})
    } catch (error) {
        res.status(500).json({ mssg: "error updating form" })
        console.log("Error updating", error)
    }
})
submitForm.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        await ModelOfForm.findByIdAndDelete({_id:id})
        res.status(200).json({success:true,mssg:" delete successfully"})
    } catch (error) {
        console.log("error",error)
        res.status(500).json({success:false,mssg:"delete failed"})
    }
})


module.exports = { submitForm }