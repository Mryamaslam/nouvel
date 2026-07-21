(function(){
  var t=document.getElementById("navToggle"),l=document.getElementById("navLinks");
  if(t&&l)t.addEventListener("click",function(){l.classList.toggle("open")});
  document.querySelectorAll(".reveal").forEach(function(el){
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("in")})},{threshold:.12}).observe(el);
  });
  var f=document.getElementById("contactForm");
  if(f)f.addEventListener("submit",function(e){
    e.preventDefault();
    var ok=true;f.querySelectorAll("[required]").forEach(function(x){if(!String(x.value||"").trim())ok=false});
    if(!ok){alert("Please fill in all required fields.");return}
    f.reset();var s=document.getElementById("formSuccess");if(s)s.classList.add("show");
  });
  // cart helpers
  function getCart(){try{return JSON.parse(localStorage.getItem("mm_cart")||"[]")}catch(e){return[]}}
  function setCart(c){localStorage.setItem("mm_cart",JSON.stringify(c));updateCartCount()}
  function updateCartCount(){
    var n=getCart().reduce(function(a,i){return a+(i.qty||1)},0);
    document.querySelectorAll("[data-cart-count]").forEach(function(el){el.textContent=n});
  }
  updateCartCount();
  document.querySelectorAll("[data-add-cart]").forEach(function(btn){
    btn.addEventListener("click",function(){
      var id=btn.getAttribute("data-add-cart");
      var name=btn.getAttribute("data-name");
      var price=parseFloat(btn.getAttribute("data-price")||"0");
      var img=btn.getAttribute("data-img")||"";
      var cart=getCart();
      var found=cart.find(function(x){return x.id===id});
      if(found)found.qty+=1; else cart.push({id:id,name:name,price:price,img:img,qty:1});
      setCart(cart);
      btn.textContent="Added ✓";
      setTimeout(function(){btn.textContent="Add to Cart"},1200);
    });
  });
  var cartRoot=document.getElementById("cartRoot");
  if(cartRoot){
    var cart=getCart();
    if(!cart.length){cartRoot.innerHTML="<p class='muted'>Your cart is empty. <a href='shop.html'>Continue shopping</a></p>";}
    else{
      var html="<div class='cart-list'>";
      var total=0;
      cart.forEach(function(i){
        total+=i.price*i.qty;
        html+="<div class='cart-row'><img src='"+i.img+"' alt=''/><div><strong>"+i.name+"</strong><p class='muted'>Qty "+i.qty+" · $"+(i.price*i.qty).toFixed(2)+"</p></div></div>";
      });
      html+="</div><p class='price' style='margin-top:20px'>$"+total.toFixed(2)+"</p><a class='btn btn-primary' href='checkout.html'>Checkout</a>";
      cartRoot.innerHTML=html;
    }
  }
  var checkoutForm=document.getElementById("checkoutForm");
  if(checkoutForm)checkoutForm.addEventListener("submit",function(e){
    e.preventDefault();
    localStorage.removeItem("mm_cart");
    updateCartCount();
    var s=document.getElementById("formSuccess");if(s)s.classList.add("show");
    checkoutForm.style.display="none";
  });

  document.querySelectorAll("#newsletterForm, .newsletter-form").forEach(function(nf){
    nf.addEventListener("submit", function(e){
      e.preventDefault();
      var email = nf.querySelector('input[type="email"]');
      if(!email || !email.value.trim()){ alert("Please enter your email."); return; }
      nf.reset();
      var note = nf.parentElement.querySelector(".nl-success");
      if(note){ note.style.display="block"; } else { alert("Thanks — you're on the list."); }
    });
  });

})();