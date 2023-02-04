const btncart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnclose=document.querySelector('#cart-close');

//console.log(btnclose)

btncart.addEventListener('click',()=>{
cart.classList.add('cart-active');
});

btnclose.addEventListener('click',()=>{
cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadfood);

function loadfood(){
	loadcontent();
}

function loadcontent(){
	//remove food items from cart

	let btnRemove=document.querySelectorAll('.cart-remove');

	btnRemove.forEach((btn)=>{
		btn.addEventListener('click',removeItem);
	});

	//product Item change event

	let qtyElement=document.querySelectorAll('.cart-quantity');

	qtyElement.forEach((input)=>{
		input.addEventListener('change',changeQty);
	});

	//product cart

	let cartBtns=document.querySelectorAll('.add-cart');
	//console.log(cartBtns);

	cartBtns.forEach((btn)=>{
		btn.addEventListener('click',addCart);
	});

	updateTotal()
}

//Remove items

function removeItem(){
	if(confirm('Are you sure to remove'))
//console.log('click')

 var title=this.parentElement.querySelector('.cart-food-title').innerHTML;
itemList=itemList.filter(el=>el.title!=title);
//console.log(title);
this.parentElement.remove();

loadcontent()

}

//change quantity

function changeQty(){
	if(isNaN(this.value) || this.value<1){
		this.value=1
	}

	 updateTotal()
}

let itemList=[];

//Add cart
function addCart(){
	//console.log('check')
	let food=this.parentElement;
	let title=food.querySelector('.food-title').innerHTML;
	let price=food.querySelector('.food-price').innerHTML;
	let imgSrc=food.querySelector('.food-img').src;
	//console.log(title,price,imgSrc);

	let newproduct={title,price,imgSrc}
	//check product already exit cart

	if(itemList.find((el)=>el.title==newproduct.title))
		{
			alert("product already added in cart");
			return;
}
else{
	itemList.push(newproduct);
}

	let newProductElement=createCartProduct(title,price,imgSrc);

	let element=document.createElement('div');
	element.innerHTML=newProductElement;
	//console.log(element);

	let cartBasket=document.querySelector('.cart-content');
	

	cartBasket.append(element);
	loadcontent();

}

function createCartProduct(title,price,imgSrc){
	return `

					<div class="cart-box">
					<img src="${imgSrc}" class="cart-img">
					<div class="detail-box">
						<div class="cart-food-title">${title}</div>
						<div class="price-box">
							<div class="cart-price">${price}</div>
							<div class="cart-amnt">${price}</div>
						</div>
						<input type="number" value="1" class="cart-quantity">
					</div>
					<ion-icon name="trash" class="cart-remove"></ion-icon>
					</div>

	`;
}

function updateTotal()
{
	const cartItems=document.querySelectorAll('.cart-box');
	//console.log(cartItems);
	const totalValue=document.querySelector('.total-price');
    //console.log(totalValue);
	let total=0;

	cartItems.forEach(product=>{
		let priceElement=product.querySelector('.cart-price');
		//console.log(priceElement)
		let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
         //console.log(price)
		let qty=product.querySelector('.cart-quantity').value;
		//console.log(qty)
		total+=(price*qty);
		//console.log(total);

		product.querySelector('.cart-amnt').innerText='Rs.'+(price*qty);
	});

	totalValue.innerHTML='Rs.'+total;

	//add product count in cart

	const cartcount=document.querySelector('.cart-count')
	let count=itemList.length;
	cartcount.innerHTML=count;

	if(count==0)
	{
		cartcount.style.display='none';
	}
	else{
		cartcount.style.display='block';
	}


}
