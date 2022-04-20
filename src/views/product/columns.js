
const columns = [
    {
        title: 'ID',
        align: 'center',
        dataIndex: 'id',
        key: 'id',
        width: '5%',
    },
    {
        title: 'Tên',
        dataIndex: 'title',
        key: "title",
        align: 'center',
        width: '20%',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category',
        key: "category",
        align: 'center',
        width: '15%',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: "description",
        align: 'center',
        width: '20%'
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: "image",
        align: 'center',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: "price",
        align: 'center',
        width: '20%',
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
    }
]

export default columns