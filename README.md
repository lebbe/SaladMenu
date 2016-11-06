# Salad Menu

This is my answer to the "hamburger menu". I do not like
hiding away key features of a web application or homepage
inside three meaningless lines. Instead I suggest this
responsive approach.

## Key features

* Accessibility, screen-readers and lynx love this menu
* Responsive, fits all screens - same menu
* No JavaScript needed, but progressively enhanced where available
* Drop down menus


## Caveats

* On graphical browsers without javascript, submenus dissappear when navigating with keyboard (I would love input on how to solve this)
* JavaScript sets window.onclick, etc. Doesn't work well with existing JavaScript (TODO: Use addEventListener instead!)

## Code example

In the example below you can see I use role, aria-label, aria-haspopup and
aria-expanded to let screen-readers get the most out of the menu. The
aria-expanded attribute is always true, unless the browser is javascript
enabled.

```html
<nav role="navigation" aria-label="Main Menu" class="salad-menu">
	<ul class="salad-menu-list">
		<li class="salad-menu-list-item">
			<a class="salad-menu-link" href="/dashboard">
				Dashboard
			</a>
		</li>
		<li aria-haspopup="true" aria-expanded="true" class="salad-menu-list-item">
			<a class="salad-menu-link salad-menu-link--submenu" href="#">Projects</a>
			<ul class="salad-submenu-list">
				<li class="salad-submenu-list-item">
					<a class="salad-menu-link" href="#">
						Project overview
					</a>
				</li>
				<li class="salad-submenu-list-item">
					<a class="salad-menu-link" href="#">
						New project
					</a>
				</li>
				<li class="salad-submenu-list-item">
					<a class="salad-menu-link" href="#">
						Project statistics
					</a>
				</li>
				<li class="salad-submenu-list-item">
					<a class="salad-menu-link" href="#">
						Project management
					</a>
				</li>
			</ul>
		</li>
	</ul>
</nav>
```