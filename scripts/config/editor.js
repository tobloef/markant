;(function() {
	const config = {
		// Configuration for CodeMirror.
		CodeMirror: {
			mode: "text/plain",
			lineWrapping: true,
			lineNumbers: false,
			autofocus: true,
			value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hoc Hieronymus summum bonum esse dixit. Illa videamus, quae a te de amicitia dicta sunt. Tum Quintus: Est plane, Piso, ut dicis, inquit.

Quos quidem tibi studiose et diligenter tractandos magnopere censeo. Haeret in salebra. Ego quoque, inquit, didicerim libentius si quid attuleris, quam te reprehenderim. Videmusne ut pueri ne verberibus quidem a contemplandis rebus perquirendisque deterreantur?

Duo Reges: constructio interrete. Nam his libris eum malo quam reliquo ornatu villae delectari. Ita relinquet duas, de quibus etiam atque etiam consideret.

Itaque in rebus minime obscuris non multus est apud eos disserendi labor. Quod cum ille dixisset et satis disputatum videretur, in oppidum ad Pomponium perreximus omnes. Terram, mihi crede, ea lanx et maria deprimet. Quo plebiscito decreta a senatu est consuli quaestio Cn. Ita multa dicunt, quae vix intellegam.

Sed quot homines, tot sententiae; Mihi enim satis est, ipsis non satis. Omnia contraria, quos etiam insanos esse vultis. Quod autem in homine praestantissimum atque optimum est, id deseruit. Tum ille: Ain tandem? Disserendi artem nullam habuit. Hosne igitur laudas et hanc eorum, inquam, sententiam sequi nos censes oportere?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hoc Hieronymus summum bonum esse dixit. Illa videamus, quae a te de amicitia dicta sunt. Tum Quintus: Est plane, Piso, ut dicis, inquit.

Quos quidem tibi studiose et diligenter tractandos magnopere censeo. Haeret in salebra. Ego quoque, inquit, didicerim libentius si quid attuleris, quam te reprehenderim. Videmusne ut pueri ne verberibus quidem a contemplandis rebus perquirendisque deterreantur?

Duo Reges: constructio interrete. Nam his libris eum malo quam reliquo ornatu villae delectari. Ita relinquet duas, de quibus etiam atque etiam consideret.

Itaque in rebus minime obscuris non multus est apud eos disserendi labor. Quod cum ille dixisset et satis disputatum videretur, in oppidum ad Pomponium perreximus omnes. Terram, mihi crede, ea lanx et maria deprimet. Quo plebiscito decreta a senatu est consuli quaestio Cn. Ita multa dicunt, quae vix intellegam.

Sed quot homines, tot sententiae; Mihi enim satis est, ipsis non satis. Omnia contraria, quos etiam insanos esse vultis. Quod autem in homine praestantissimum atque optimum est, id deseruit. Tum ille: Ain tandem? Disserendi artem nullam habuit. Hosne igitur laudas et hanc eorum, inquam, sententiam sequi nos censes oportere?`,
		},
		// Id of the drag bar element, used for resizing the editor and viewer panes.
		dragbarId: "dragbar",
		// Id of the editor pane element.
		editorPaneId: "editor-pane",
		// Id of the CodeMirror editor.
		editorId: "editor",
		// Id of the viewer pane element.
		viewerPaneId: "viewer-pane",
		// ID of the viewer element, where the Markdown is rendered.
		viewerId: "viewer",
		// Id of the container for the editor and viewer panes.
		paneContainerId: "pane-container",
		// Id of the leftmost button to collapse the editor pane.
		leftCollapseButtonId: "left-pane-collapse-button",
		// Id of the rightmost button to collapse the viewer pane.
		rightCollapseButtonId: "right-pane-collapse-button",
	};

	module.exports = config;
}());
