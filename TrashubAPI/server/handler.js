const trashBins = [
    {
        Alamat: "Jl. Sudirman No.45, Jakarta Pusat, DKI Jakarta",
        Nama_Bak_Sampah: "Bak Sampah Sudirman"
    },
    {
        Alamat: "Jl. Gatot Subroto No.17, Jakarta Selatan, DKI Jakarta",
        Nama_Bak_Sampah: "Bak Sampah Gatot Subroto"
    },
    {
        Alamat: "Jl. Malioboro No.22, Yogyakarta",
        Nama_Bak_Sampah: "Bak Sampah Malioboro"
    },
    {
        Alamat: "Jl. Pemuda No.1, Surabaya, Jawa Timur",
        Nama_Bak_Sampah: "Bak Sampah Pemuda"
    },
    {
        Alamat: "Jl. Asia Afrika No.2, Bandung, Jawa Barat",
        Nama_Bak_Sampah: "Bak Sampah Asia Afrika"
    },
    {
        Alamat: "Jl. Diponegoro No.10, Medan, Sumatera Utara",
        Nama_Bak_Sampah: "Bak Sampah Diponegoro"
    },
    {
        Alamat: "Jl. Slamet Riyadi No.5, Solo, Jawa Tengah",
        Nama_Bak_Sampah: "Bak Sampah Slamet Riyadi"
    },
    {
        Alamat: "Jl. Pahlawan No.8, Semarang, Jawa Tengah",
        Nama_Bak_Sampah: "Bak Sampah Pahlawan"
    },
    {
        Alamat: "Jl. Ahmad Yani No.12, Makassar, Sulawesi Selatan",
        Nama_Bak_Sampah: "Bak Sampah Ahmad Yani"
    },
    {
        Alamat: "Jl. Teuku Umar No.14, Denpasar, Bali",
        Nama_Bak_Sampah: "Bak Sampah Teuku Umar"
    }
]

const getAllTrashBins = (req, res) => {
    try{
        res.status(200).json(trashBins);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching trash bins", error: error.message });
    }
}

const searchTrashBins = async (req, res) =>{

    try {
        const query = await req.query.q.toLowerCase()

        setTimeout(() =>{
            try {
                const filteredBins = trashBins.filter(bin => 
                    bin.Alamat.toLowerCase().includes(query) || 
                    bin.Nama_Bak_Sampah.toLowerCase().includes(query)
                );
                res.status(200).json(filteredBins);
            } catch (error) {
                res.status(500).json({ message: "An error occurred while filtering trash bins", error: error.message });
            }
        }, 1000)

    } catch (error){
        res.status(500).json({ message: "An error occurred while query trash bins", error: error.message });
    }

}

module.exports = {
    getAllTrashBins, 
    searchTrashBins
}
