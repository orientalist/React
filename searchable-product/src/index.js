import React from 'react';
import ReactDOM from 'react-dom';

const products = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

function SearchBar(props) {
    return (
        <div>
            <input type='text'
                value={props.text} placeholder='Search...'
                onChange={props.handleText}
            ></input>
            <br />
            <input type='checkbox'
                value={props.onlyStocked}
                onClick={props.handleCheck}
            ></input>Only show products in stock
        </div>
    );
};

function ProductCategoryRow(props){
    return (
        <span>{props.category}</span>
    );
}

function ProductRow(prop){
    let rows=prop.products.map((p)=>
        <div>{p.name} &nbsp; {p.price}</div>
    );
    return rows;
}

function ProductTable(props) {
    let product_by_category=[];
    props.categories.forEach(c=>{
        product_by_category.push({c:c,p:props.products.filter(p=>p.category===c)});
    });

    product_by_category=product_by_category.filter(p=>p.p.length>0);

    let product_doms=product_by_category.map((p)=>
        <div>
            <ProductCategoryRow category={p.c}/>
            <ProductRow products={p.p}/>
        </div>
    );

    return(
        <div>
            <div>Name &nbsp; Price</div>       
            {product_doms}
        </div>
    );
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleText = this.handleText.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.state = { text: '', onlyStocked: false ,categories:[...new Set(products.map(p=>p.category))]};
    }

    handleText(e) {
        this.setState({ text: e.target.value });
    }
    handleCheck(e) {
        this.setState({ onlyStocked: e.target.checked });
    }

    render() {
        let text = this.state.text;
        let onlyStock = this.state.onlyStocked;
        let filteredProducts = products.filter(d => d.name.includes(text));
        if (onlyStock) {
            filteredProducts = filteredProducts.filter(d => d.stocked === true)
        }

        return (
            <div>
                <SearchBar
                    text={text}
                    onlyStock={onlyStock}
                    handleText={this.handleText}
                    handleCheck={this.handleCheck}
                />
                <ProductTable products={filteredProducts} categories={this.state.categories}/>
            </div>
        )
    };
};

ReactDOM.render(
    <FilterableProductTable />,
    document.getElementById('root')
);