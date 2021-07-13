<template>
<div class="container-fluid">
   <div class="row intro__hero woodgrain-bg-dark bg-brown">
      <div class="col-md-6 d-flex align-items-center order-md-0 order-2 intro__hero-content">
         <div class="brand-content w-100 position-relative text-left">
            <div class="position-relative mx-auto text-center text-md-left" style="max-width:600px;">
               <p class="preheader text-white">Squatchin' Made Easy</p>
               <h2 class="text-white" style="font-size:40px;">Build Your Routine</h2>
               <p class="copy text-white">Get all the Squatch products you need, when you need them.</p>
               <button class="btn btn-primary" @click.prevent="$parent._flowNext()" style="min-width: 300px;">Get Started</button>
            </div>
         </div>
      </div>
      <div class="col-md-6 order-0 order-md-2 intro__hero-bg px-0" style="overflow:hidden;">
        <video height="auto" width="100%"
          autoplay loop autobuffer muted playsinline onloadedmetadata="this.muted = true" 
          style="z-index: 0; top: 0;bottom: 0; left: 0; right: 0; margin: auto;" class="video-elem position-md-absolute"
          src="https://embed-ssl.wistia.com/deliveries/a9603cd7aa6ef53134e3fe8be062e98105e2a319.mp4">
            <source src="https://embed-ssl.wistia.com/deliveries/a9603cd7aa6ef53134e3fe8be062e98105e2a319.mp4"
              type="video/mp4">
            <source src="https://embed-ssl.wistia.com/deliveries/a9603cd7aa6ef53134e3fe8be062e98105e2a319.webm" type="video/webm"></source>
            <source src="https://embed-ssl.wistia.com/deliveries/a9603cd7aa6ef53134e3fe8be062e98105e2a319.mov" type="video/mov"></source>
        </video>
      </div>
   </div>
   <div class="row intro__valueProps">
      <div class="col-12 brand-content text-center">
         <h1>This subscription is good. Real good.</h1>
      </div>
      <div class="col-12 col-md-4 intro__valueProp">
         <div class="intro__valueProp__circle">
          <img class="w-100" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Value-Savings.svg?v=1618527529" />
         </div>
         <h4 class="intro__valueProp__title">
         Save Money +<br/>Get Free Shipping</h4>
         <p class="intro__valueProp__text">More Squatch, more savings. Plus free shipping for life. Boom.</p>
      </div>
      <div class="col-12 col-md-4 intro__valueProp">
         <div class="intro__valueProp__circle">
          <img class="w-100" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Value-Edit.svg?v=1618527529" />
         </div>
         <h4 class="intro__valueProp__title">
         You’re The<br/>Captain Now</h4>
         <p class="intro__valueProp__text">Customize your picks and scents, upgrade anytime, or hit
            snooze if you want. You’re in control.
         </p>
      </div>
      <div class="col-12 col-md-4 intro__valueProp">
         <div class="intro__valueProp__circle">
          <img class="w-100" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Value-Product.svg?v=1618527530" />
         </div>
         <h4 class="intro__valueProp__title">
         First Dibs<br/></h4>
         <p class="intro__valueProp__text">Get first access to limited edition scents, new products,
            and Subscriber-only specials.
         </p>
      </div>
      <div class="col-12 mt-4">
        <button class="btn btn-primary" @click.prevent="$parent._flowNext()" style="min-width: 300px;">Get Started</button>
      </div>
   </div>
   <div class="row intro__guarantee">
      <div class="new-sudisfaction-guarantee text-center mt-5 mb-5">
         <div>
            <img
               src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/SquatchFoot.svg?v=1615322349"
               alt="squatch foot icon"
               />
            <h6>100% Sudisfaction Guaranteed</h6>
            <p>
               Try Squatch, love Squatch. If you don’t, let us know within 30
               days and it’s on us!
            </p>
         </div>
      </div>
   </div>
   <div class="row intro__faq">
      <div class="col-12 brand-content text-center px-0">
         <p class="preheader">Got questions? We got answers!</p>
         <h1>Subscription F.A.Q's</h1>
      </div>
      <div class="col-md-12 navbar-mobile px-0">
         <div id="faq-accordian">
            <div class="faq-card">
               <div class="card-header">
                  <a href="#" role="button" data-toggle="collapse" data-target="#faq-question-3" aria-expanded="true"
                    class="submenu-toggle d-flex align-items-center justify-content-between">
                    <span class="font-weight-bold">Do I get to control my subscription schedule?</span> <i class="icon-toggle"></i>
                  </a>
               </div>
               <div id="faq-question-3" class="collapse show">
                  <div class="card-body">
                     You bet! You can adjust your products and delivery
                     schedule anytime you want. Want to hit snooze or take a
                     break? No problem, we’ve got you covered.
                  </div>
               </div>
            </div>
            <div class="faq-card">
              <div class="card-header">
                  <a href="#" role="button" data-toggle="collapse" data-target="#faq-question-2" aria-expanded="false"
                    class="submenu-toggle d-flex align-items-center justify-content-between collapsed">
                    <span class="font-weight-bold">Can I change the products or scents in my subscription?</span> <i class="icon-toggle"></i>
                  </a>
               </div>
               <div id="faq-question-2" class="collapse">
                  <div class="card-body">
                     Yup! You can easily customize your favorite scents and
                     products at any time.
                  </div>
               </div>
            </div>
            <div class="faq-card">
              <div class="card-header">
                  <a href="#" role="button" data-toggle="collapse" data-target="#faq-question-4" aria-expanded="false"
                    class="submenu-toggle d-flex align-items-center justify-content-between collapsed">
                    <span class="font-weight-bold">What if I need to cancel my subscription?</span> <i class="icon-toggle"></i>
                  </a>
               </div>
               <div id="faq-question-4" class="collapse">
                  <div class="card-body">
                     We’d definitely miss you but you can definitely cancel
                     anytime you want. We’ll be here if you change your mind
                     too!
                  </div>
               </div>
            </div>
            <div class="faq-card">
               <div class="card-header">
                  <a href="#" role="button" data-toggle="collapse" data-target="#faq-question-1" aria-expanded="false"
                    class="submenu-toggle d-flex align-items-center justify-content-between collapsed">
                    <span class="font-weight-bold">Can I purchase products without a subscription?</span> <i class="icon-toggle"></i>
                  </a>
               </div>
               <div id="faq-question-1" class="collapse">
                  <div class="card-body">
                     Absolutely! All of our products are available to purchase
                     without a subscription on our website.
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="row intro__footer woodgrain-bg-dark bg-brown">
      <div class="col-md-6 intro__footer-bg">
        <img src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/FreshFalls_Subscription.jpg?v=1616440670" class="w-100" />
      </div>
      <div class="col-md-6 d-flex align-items-center intro__footer-content">
         <div class="brand-content w-100 position-relative text-left">
            <div class="position-relative mx-auto" style="max-width:600px;">
               <h2 class="text-white mb-2">Subscribe &amp; Save</h2>
               <p class="subheader text-white mb-3">Give our natural products a try! Sudisfaction guaranteed, cancel anytime.</p>
               <ul class="fast-facts">
                  <li>Pick your favorite scents and products</li>
                  <li>Free shipping, delivered to your door!</li>
                  <li>Special perks and early access to limited release products</li>
               </ul>
               <button class="btn btn-primary" @click.prevent="$parent._flowNext()" style="min-width: 300px;">Get Started</button>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
  export default {
    name: "sub-flow-intro"
  }
</script>