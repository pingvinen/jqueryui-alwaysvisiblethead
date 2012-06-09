jQueryUI Always Visible Thead widget
===================

Use this widget on a table with many rows. It will then make sure that when the user scrolls and can no longer see the &lt;thead&gt;
a copy of the &lt;thead&gt; is positioned in view.

This widget does not alter the "wrapped" table in any way.


How to use it
----------

1. Include jQuery and jQueryUI scripts
2. Include "jquery-ui-alwaysvisiblethead.js"
3. Enable the widget with $(selector).alwaysvisiblethead()

See "tests/index.html" for a complete examples.


Options
----------

<table>
	<tr>
		<th>Option</th>
		<th>Type</th>
		<th>Default</th>
		<th>Description</th>
	</tr>
	
	<tr>
		<td>fallbackBackgroundColor</td>
		<td>String</td>
		<td>"#fff"</td>
		<td>The background color to use for the movable container, in the event that a proper background color cannot be found</td>
	</tr>
	
	<tr>
		<td>topOffset</td>
		<td>Integer</td>
		<td>0</td>
		<td>An offset (in pixels) to use for determining when to enable the moving thead and at what position to place it</td>
	</tr>

</table>


Dependencies
----------
* jQuery 1.7.2
* jQueryUI 1.8.20
	* Core
	* Widget

