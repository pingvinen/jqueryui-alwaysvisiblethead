
(function($, undefined) {

	/**
	 * Use this widget on a table with many rows.
	 * It will then make sure that when the user
	 * scrolls and can no longer see the <thead>
	 * a copy of the <thead> is positioned in view.
	 *
	 * This widget does not alter the "wrapped" table
	 * in any way.
	 *
	 * Author: pingvinen
	 * Version: 2014-07-27
	 *
	 * https://github.com/pingvinen/jqueryui-alwaysvisiblethead
	 *
	 * Requires:
	 * jQuery 1.7.2
	 * jQueryUI 1.8.20
	 * 		- Core
	 *		- Widget
	 */
	$.widget("ui.alwaysvisiblethead", {
	
		"options": {
			/**
			 * Fallback background color
			 * Default = "#fff"
			 * @type String
			 */
			"fallbackBackgroundColor": "#fff",
			
			/**
			 * An offset (in pixels) to use for determining
			 * when to enable the moving thead
			 * and at what position to place it
			 * Default = 0
			 * @type Int
			 */
			"topOffset": 0
		},
		
		/**
		 * Initialization method
		 */
		"_create": function() {
			this.$element = $(this.element);
			
			this.$movable = null;
			
			$(document).bind("scroll", $.proxy(function(event) {
				this._onScroll(event);
			}, this));
		},
		
		/**
		 * Handles the scroll event
		 */
		"_onScroll": function(event) {
			var docScrollTop = $(document).scrollTop() + this.options.topOffset;
			var tblTop = this.$element.offset().top;
			
			if (docScrollTop > tblTop) {
				if (this.$movable == null) {
					this.$movable = this._makeMovableThead();
					this.$element.parent().append(this.$movable);
					this.$movable
							.css("position", "fixed")
							.css("top", this.options.topOffset);
				}
			}
			else {
				if (this.$movable != null) {
					this.$movable.remove();
					this.$movable = null;
				}
			}
			
		},
		
		/**
		 * Make the movable "thead" element
		 * @returns jQuery
		 */
		"_makeMovableThead": function() {
			var $table = this.$element.clone().empty();
			
			var $originalThead = this.$element.find("thead");
			
			var $thead = $originalThead.clone();
			
			// manually copy the width of each column (as clone does not do this)
			// in each row
			$originalThead.find("tr").each($.proxy(function(rowIndex, rowElm) {
				var $row = $(rowElm);
				$row.find("th").each($.proxy(function(cellIndex, cellElm) {
					var $cell = $(cellElm);
					
					var $clone = $(
						$( $thead.find("tr")[rowIndex] )
							.find("th")[cellIndex]
					);

					$clone.css("width", $cell.css("width"));
					this._addEventHandlers($cell, $clone);
				}, this));
			}, this));
			
			$table.append($thead);
			
			return $table
						.css("width", this.$element.css("width"))
						.css("background-color", this._findBackgroundColor());
		},

		"_addEventHandlers": function($original, $clone) {
			// inspired by
			// http://stackoverflow.com/a/10332551

			var events = $._data($original.get(0), 'events');

			if (events === undefined) {
				return;
			}

			for (var x in events) {
				// x = event type (e.g. 'click')
				// instead of "copying" the handler, we just trigger
				// the event on the original element. This should make
				// this more robust if used in a system where the handlers
				// are changed
				$clone.bind(x, function() { $original.trigger(x); });
			}
		},
		
		/**
		 * Find the background color to use for the
		 * movable thead.
		 * @returns String
		 */
		"_findBackgroundColor": function() {
			// we want the first parent that defines a background
			// color that is not transparent - if the element itself
			// does not specify a background color
			
			// ".andSelf()" reverses the element order
			// http://bugs.jquery.com/ticket/10922
			var parents = this.$element.parentsUntil("html").andSelf().toArray();
			parents.reverse();
			
			var $elm;
			var color;

			for (var x in parents) {
				$elm = $(parents[x]);
				
				var color = $elm.css("background-color");
			
				// elements with no explicit bg-color, return
				// "transparent" as an rgba color
				if (color != "rgba(0, 0, 0, 0)") {
					return color;
				}
			}
			
			return this.options.fallbackBackgroundColor;
		},
		
		/**
		 * Destroy the widget instance and return
		 * everything to it's original state
		 */
		"_destroy": function() {
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});

})(jQuery);
