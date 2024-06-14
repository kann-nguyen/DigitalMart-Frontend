import { useDispatch } from 'react-redux';
import './CommonView.scss'
import { useEffect } from 'react';

const CommonView = ({ isEdit }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory())
    }, []);
    const [fileList, setFileList] = useState([]);
    const [previews, setPreviews] = useState([])
    const [metadata, setMetadata] = useState({});
    const [metadataProps, setMetadataProps] = useState([]);
    const handleAddProp = () => {
        setMetadataProps([...metadataProps, { key: '', value: '' }]);
    };
    const handleMetadataPropChange = (index, event) => {
        const { name, value } = event.target;
        const newMetadataProps = [...metadataProps];
        newMetadataProps[index][name] = value;
        setMetadataProps(newMetadataProps);
        const newMetadata = {};
        newMetadataProps.forEach(input => {
            if (input.key) {
                newMetadata[input.key] = input.value;
            }
        });
        formik.setFieldValue('metadata', newMetadata);
    };
    const handleRemoveProp = (index) => {
        const newMetadataProps = metadataProps.filter((_, i) => i !== index);
        setMetadataProps(newMetadataProps);
        const newMetadata = {};
        newMetadataProps.forEach(input => {
            if (input.key) {
                newMetadata[input.key] = input.value;
            }
        });
        formik.setFieldValue('metadata', newMetadata);
    };
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/admin/inventory');
    }
    useEffect(() => {
        if (fileList.length === 0) {
            setPreviews([])
            return;
        }
        const fileListUrl = fileList.map(item => URL.createObjectURL(item));
        setPreviews(_ => fileListUrl);
        console.log(fileListUrl);
        return () => fileListUrl.map(url => URL.revokeObjectURL(url));
    }, [fileList])
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile([])
            return
        }
        const newFile = e.target.files && e.target.files[0];
        const type = newFile.type.split('/')[0];
        if (type !== "image") {
            toast.error("Please upload Image type")
            return;
        }
        const newList = [...fileList, newFile];
        setFileList(newList);
        formik.setFieldValue('images', newList)
    }
    const handleClickAddBtn = () => {
        fileRef.current?.click();
    }
    const handleRemoveImage = (index) => {
        const newList = fileList.filter((_, i) => i !== index);
        setFileList([...newList]);
        formik.setFieldValue('images', newList);
    }
    const categories = useSelector((state) => state.categories.categories);
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            brand: '',
            category: '',
            metadata: {},
            images: [],
            stock: 0,
            threshold: 0
        },
        validationSchema: Yup.object({
            name: Yup.string().required().max(100).min(10),
            description: Yup.string().required(),
            price: Yup.number().min(1).required(),
            brand: Yup.string().required(),
            category: Yup.string().required(),
            metadata: Yup.object(),
            images: Yup.array().min(1).required(),
            stock: Yup.number().min(1),
            threshold: Yup.number().min(1),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            const formData = new FormData();
            formData.append('name', values.name)
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('brand', values.brand);
            formData.append('category', values.category);
            formData.append('stock', values.stock);
            formData.append('threshold', values.threshold);
            values.images.forEach((image) => formData.append('images', image))
            Object.entries(values.metadata).forEach(([key, value]) => {
                formData.append(`metadata[${key}]`, value);
            });
            dispatch(setLoading(true))
            dispatch(createProduct(formData))
                .unwrap()
                .then((result) => {
                    resetForm()
                    navigate('/admin/inventory');
                })
                .catch(err => {
                    toast.error(err.message);
                })
                .finally(() => dispatch(setLoading(false)))
        },
        validateOnChange: false,
        validateOnBlur: false
    });
    return (
        <div className='container common-view'>
            
        </div>
    )
}

export default CommonView;