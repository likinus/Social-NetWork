import React from 'react';

import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <section class={s.page_404}>
	        <div class={s.container}>
		      <div class={s.row}>	
		        <div class="col-sm-12">
		          <div class="col-sm-10 col-sm-offset-1  text-center">
		            <div class={s.four_zero_four_bg}>
			            <h1 class="text-center">404</h1>
		            </div>
		
		<div class={s.contant_box_404}>
		<h3 class="h2">
		Look like you're lost
		</h3>
		
		<p>the page you are looking for not avaible!</p>
		
		<a href="/profile" class={s.link_404}>Go to Home</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>
    )
}

export default NotFoundPage