import React, {
    useState,
    useEffect
} from 'react';

import {
    useSelector,
    useDispatch
} from 'react-redux';

import { Bar, Pie, Line } from 'react-chartjs-2';

import ProductTable from './table';
import Pagination from './pagination';
import BackDrop from './backdrop';

import FormField from '../../authentication/views/login/formfield';
import {
    update,
    generateData,
    isFormValid,
    resetFieldsNoValid
} from '../../authentication/views/login/formactions';

import {
    getProducts
} from '../../../store/act/product_action';

import { useHistory } from 'react-router';
import { useWindowSize } from './windowsize';
import { FaSortNumericDown, FaSortNumericDownAlt, FaBars } from 'react-icons/fa'

const DashboardPage = (props) => {

    const authentication = useSelector(state => state.user.userData);
    const getproducts = useSelector(state => state.product.getProducts);
    const products = getproducts && getproducts.products && getproducts.products.length > 0 ? getproducts.products : [];
    // console.log(products, "<<<products")
    var produtType = products.map((value) => value.type).filter((value, index, _arr) => _arr.indexOf(value) === index);
    // var mainCategory = products.map((value) => value.maincategory).filter((value, index, _arr) => _arr.indexOf(value) == index);
    var countType = products.map((value) => value.type);
    var counts = {}
    countType.forEach(x => { counts[x] = (counts[x] || 0) + 1 })

    var realCount = []
    for (let key in counts) {
        realCount.push(counts[key]);
    }
    console.log(realCount, "<<<,realcout")
    const dispatch = useDispatch();
    const history = useHistory();
    const size = useWindowSize();
    const isMobile = size.width <= 767.98;
    const pageSize = 10;

    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');

    const [currentPage, currentPageHandler] = useState(1);
    // const [filterText, filterTextHandler] = useState("");
    const [dataCount, dataCountHandler] = useState("");
    const [mydata, mydataHandler] = useState([]);

    const [loadingscreen, loadingscreenHandler] = useState(false);
    const [sideDrawerOpen, sideDrawerOpenHandler] = useState(false);

    const [formdata, formdataHandler] = useState({
        min: {
            element: 'input',
            title: 'Minimum',
            value: '',
            config: {
                name: 'minInput',
                type: 'tel',
                placeholder: 'minimum price'
            },
            validation: {
                required: false,
                number: true
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        max: {
            element: 'input',
            title: 'Maximum',
            value: '',
            config: {
                name: 'maxInput',
                type: 'tel',
                placeholder: 'maximum price'
            },
            validation: {
                required: false,
                number: true
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
    });

    const formstyle = {
        formcolour: '#111111',
        formbgcolour: '#ffffff',
        formbordercolour: '#dddddd',
        formiconcolour: '#878787',
        formheight: 50,
        formfontsize: 15
    }

    useEffect(() => {
        // var results = [];
        var resultsdata = [];
        var offset = (currentPage - 1) * pageSize;
        if (products) {
            // results = products.filter(data =>
            //     (data.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1))
            resultsdata = products.map((item, index) => <ProductTable item={item} index={index} key={index} />)
            var semuadata = [...resultsdata];
            var mydatas = semuadata.slice(offset, offset + pageSize);
            dataCountHandler(semuadata.length);
            mydataHandler(mydatas);
        }

    }, [currentPage, products, pageSize])

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'phone');
        formErrorHandler(false);
        formdataHandler(newFormdata);
    }

    const userLogout = (event) => {
        event.preventDefault();
        history.push('/auth/logout')
    }

    const pageChanged = (pageNumber, e) => {
        e.preventDefault();
        currentPageHandler(pageNumber)
    }

    const tablemenu = [
        {
            head: 'SKU'
        },
        {
            head: 'Name'
        },
        {
            head: 'Price'
        },
        {
            head: 'Type'
        }
    ]

    const pieState = {
        labels: produtType,
        datasets: [
            {
                label: 'Product Type',
                backgroundColor: [
                    '#6800B4',
                    '#B21F00',
                    '#2FDE00',
                    '#00A6B4',
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: realCount
            }
        ]
    }

    const barState = {
        labels: produtType,
        datasets: [
            {
                label: 'initial',
                backgroundColor: "rgba(255,99,132,0.5)",
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: ['3696', '123', '271', '37']
            },
            {
                label: 'current',
                backgroundColor: "rgba(155,231,91,0.5)",
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: realCount
            }
        ]
    }

    const lineState = {
        labels: produtType,
        datasets: [
            {
                label: 'alldata',
                backgroundColor: [
                    '#6800B4',
                    '#B21F00',
                    '#2FDE00',
                    '#00A6B4',
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: realCount
            }
        ]
    }

    const backdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        sideDrawerOpenHandler(false)
    }

    const showMenu = () => {
        sideDrawerOpenHandler(true)
    }
    const className = `dashboardCardLeft ${sideDrawerOpen ? 'open' : ''}`;

    const onSubmitData = (event) => {
        event.preventDefault();
        loadingscreenHandler(true);
        errorMessageHandler('');

        const newFormdata = {
            ...formdata
        }

        for (let key in newFormdata) {
            newFormdata[key].validationMessage = '';
        }

        formdataHandler(newFormdata);

        let dataToSubmit = generateData(formdata, 'filter');
        let formIsValid = isFormValid(formdata, 'filter');

        if (formIsValid) {
            dispatch(getProducts(dataToSubmit)).then(response => {
                console.log(response, '<<<<response asdfasdfasdf')
                if (response.payload.success) {
                    const newFormData = resetFieldsNoValid(formdata, 'reset');
                    setTimeout(() => {
                        formdataHandler(newFormData)
                        loadingscreenHandler(false);
                        formErrorHandler(false);
                        formSuccessHandler(false);
                    }, 1000)
                } else {
                    formErrorHandler(true);
                    loadingscreenHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            formErrorHandler(true);
            loadingscreenHandler(false);
            errorMessageHandler('PLEASE TRY AGAIN!');
        }
    }

    return (
        <div className="dashboardWrapper">
            <div
                className="dashboardContainer"
            >
                <div className="dashboardCardWrapper">
                    <div className={className}>
                        {
                            loadingscreen ?
                                <div
                                    style={{
                                        height: 350
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        <div className="lds-ripple"><div></div><div></div></div>
                                    </div>
                                </div>

                                :
                                <div className="innerCard">
                                    <div className="demmy-md-12" style={{ marginTop: 35, marginBottom: 35 }}>Filter data</div>
                                    <div className="demmy-md-12" style={{ marginBottom: 35 }}>
                                        <div className="iconPosition">
                                            <FaSortNumericDown
                                                className="icon agraicon"
                                                style={{
                                                    color: formstyle.formiconcolour
                                                }}
                                            />
                                        </div>
                                        <FormField
                                            id={'min'}
                                            formdata={formdata.min}
                                            change={(element) => updateForm(element)}
                                            myclass={'form-control'}
                                        />
                                    </div>
                                    <div className="demmy-md-12" style={{ marginBottom: 35 }}>
                                        <div className="iconPosition">
                                            <FaSortNumericDownAlt
                                                className="icon agraicon"
                                                style={{
                                                    color: formstyle.formiconcolour
                                                }}
                                            />
                                        </div>
                                        <FormField
                                            id={'max'}
                                            formdata={formdata.max}
                                            change={(element) => updateForm(element)}
                                            myclass={'form-control'}
                                        />
                                    </div>
                                    {
                                        formError ?
                                            <div className="demmy-md-12">
                                                <div className="errorSubmit">
                                                    {errorMessage}
                                                </div>
                                            </div>
                                            :
                                            formSuccess ?
                                                <div className="demmy-md-12">
                                                    <div className="successSubmit">
                                                        PROCESSING, PLEASE WAIT!
                                                    </div>
                                                </div>
                                                : null
                                    }
                                    <div className="demmy-md-12" style={{ marginTop: 35 }}>
                                        <div
                                            className="applyButton"
                                            onClick={(event) => onSubmitData(event)}
                                        >
                                            Apply
                                        </div>
                                    </div>
                                </div>
                        }

                    </div>
                    <div className="dashboardCardRight">
                        <div className="topInnerCardRight">
                            {
                                isMobile ?
                                    <div
                                        className="mobileButton"
                                        style={{ cursor: isMobile ? 'pointer' : 'default' }}
                                        onClick={isMobile ? () => showMenu() : null}
                                    >
                                        <FaBars />
                                    </div>
                                    : null
                            }
                            <div className="cardRightWrapper">
                                <div>Welcome, {authentication && authentication.name}</div>
                                <div
                                    className="logoutButton"
                                    onClick={(event) => userLogout(event)}
                                >
                                    Logout
                                </div>
                            </div>
                        </div>
                        <div className="innerCardRight">
                            <div className="topInner">
                                <div className="demmy-md-4 demmy-xs-12">
                                    <div className="pieChart">
                                        <Pie
                                            data={pieState}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: 'Test',
                                                    fontSize: 20
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'right'
                                                },
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="demmy-md-4 demmy-xs-12">
                                    <div className="barChart">
                                        <Bar
                                            data={barState}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: 'Test',
                                                    fontSize: 20
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'right'
                                                },
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="demmy-md-4 demmy-xs-12">
                                    <div className="lineChart">
                                        <Line
                                            data={lineState}
                                            options={{
                                                title: {
                                                    display: true,
                                                    text: 'Test',
                                                    fontSize: 20
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'right'
                                                },
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bottomInner">
                                <div className="demmy-md-12" style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, marginBottom: 0 }}>
                                    <h4 className="tableTitle">Tabular Data</h4>
                                    {
                                        isMobile ? <span style={{ display: 'flex', justifyContent: 'center', fontSize: 13, fontStyle: 'italic' }}>*you can slide the table below</span> : null
                                    }
                                    <div className="tableCard">
                                        <div className="tableCardBody">
                                            {
                                                mydata && mydata.length > 0 ?
                                                    <div className="tableResponsiveSm">
                                                        <table className="table" id='tableproduct'>
                                                            <thead>
                                                                <tr>
                                                                    {
                                                                        tablemenu.map((item, index) => (
                                                                            <th key={index}>{item.head}</th>
                                                                        ))
                                                                    }
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {
                                                                    mydata
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    :
                                                    <div className="tableResponsiveSm">
                                                        <table className="table" id={props.tablename}>
                                                            <thead>
                                                                <tr>
                                                                    <th>NO DATA</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                <tr>
                                                                    <td>NO DATA</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                            }
                                            <nav style={{ marginTop: 30 }}>
                                                <Pagination Size={mydata && mydata.length > 0 ? dataCount : 1} pageLimit={pageSize} onPageChanged={pageChanged} currentPage={currentPage} width={isMobile} />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                sideDrawerOpen &&
                <BackDrop click={backdropClickHandler} />
            }
        </div>
    );
};

export default DashboardPage;