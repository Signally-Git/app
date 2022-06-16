import classes from "./templateSelect.module.css";
import { useState } from "react";
// import Template from './template';
import Button from "Utils/Button/btn";
import Template from "../Preview/customizablePreview";

// Displaying the list of bought and free templates (Studio, Store) and allows to select one to create custom signature

const templateAPI = [
	{
		id: 0,
		alignment: "Horizontal",
		tags: ["studio"],
		name: "Mama Shelter",
		html: `
	{# START GREETINGS #}
	<span style="padding-bottom: {{ styles['greetingsPadding']['padding'] }};">
	{% if greetings %}
		{{ greetings }}
	{% endif %}
</span>
	{# END GREETINGS #}
<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:0">
	<tbody>
		<tr>
			<td valign="top" style="width:380px; height: 108px; border: none; padding: 0cm">
				<table class="x_MsoTableGrid" border="0" cellspacing="2" cellpadding="2" style="border-collapse:collapse; border:none">
					<tbody>
						<tr>
							<td valign="top" style="width:108px; border: none; padding: 0cm 8px 0 0; font-size: 8.5pt;">
								<p class="x_MsoNormal" style="height: 108px; margin: 0; padding: 0;" height="108" valign="middle">
								<span style="height: 108px;" height="108">
								<a href="{{company.websiteUrl}}"><img style="width: 108px; height: 108px; vertical-align: middle;" height="108" width="108" valign="middle" src="{{ absolute_url(asset(logo)) }}" alt="{{ company.name }}"/></a>
							</span>

								</p>
							</td>
							<td valign="middle" style="box-sizing: border-box; border: none; padding: 0;">
								<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:none; border-color: {{ styles['divColor']['color'] }};">
									<tbody>
										<tr> 
											<td style="background: {{ styles['divColor']['color'] }}; width: 12px; height: 108px; border-radius: 4px 0 0 4px;"/>
											<td style="box-sizing: border-box; border: none; background: {{ styles['divColor']['color'] }}; font-size: 8pt; height: 108px; width: 240px">
												<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:none; font-size: 8pt;">
													<tbody>
														<tr height="1">
															<td style="font-size: 8pt; padding:0">
																<b style="color:{{ styles['firstName']['color'] }}; text-decoration: {{ styles['firstName']['textDecoration'] }}; font-style: {{ styles['firstName']['fontStyle'] }}; font-weight: {{ styles['firstName']['fontWeight'] }}; font-size: 8pt; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																	{% if isPreview %} Prénom {% else %} {{ user.firstName }} {% endif %}
                                                                </b>
																<b style="color:{{ styles['lastName']['color'] }}; text-decoration: {{ styles['lastName']['textDecoration'] }} ;font-style: {{ styles['lastName']['fontStyle'] }} ;font-weight: {{ styles['lastName']['fontWeight'] }}; font-size: 8pt; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																{% if isPreview %} Nom {% else %} {{ user.lastName }} {% endif %}
                                                                </b>
															</td>
														</tr>
														<tr style="height: 1px">
															<td>
																<span style="color:{{ styles['jobName']['color'] }}; text-decoration: {{ styles['jobName']['textDecoration'] }} ;font-style: {{ styles['jobName']['fontStyle'] }} ;font-weight: {{ styles['jobName']['fontWeight'] }}; padding: 0cm; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																{% if isPreview %} Poste {% else %} {{ user.position }} {% endif %}
																</span>
															</td>
														</tr>
														<tr height="5"></tr>
														<tr>
															<td>
																<span style="color:{{ styles['companyName']['color'] }}; text-decoration: {{ styles['companyName']['textDecoration'] }} ;font-style: {{ styles['companyName']['fontStyle'] }}; font-weight: {{ styles['companyName']['fontWeight'] }}; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
                                                                {{ company.name }}</span>
															</td>
														</tr>
														<tr>
															<td>
																<span style="color:{{ styles['addressStreet']['color'] }}; text-decoration: {{ styles['addressStreet']['textDecoration'] }} ;font-style: {{ styles['addressStreet']['fontStyle'] }}; font-weight: {{ styles['addressStreet']['fontWeight'] }}; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">{{ address.street }}
																	{{ address.streetInfo }}
																</span>
															</td>
														</tr>
														<tr>
															<td>
																<span style="color:{{ styles['addressZipcode']['color'] }}; text-decoration: {{ styles['addressZipcode']['textDecoration'] }} ;font-style: {{ styles['addressZipcode']['fontStyle'] }} ;font-weight: {{ styles['addressZipcode']['fontWeight'] }}font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																	{{ address.zipCode }}
																	{{ address.city }}
																	{{ address.country }}
																</span>
															</td>
														</tr>
														{# START PHONE #}
														{% if user.phone %}
														<tr>
															{% if user.phone or isPreview %}
															<td style=" padding: 0; color: {{ styles['mobile']['color'] }}; font-weight: {{ styles['mobile']['fontWeight'] }}; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }}">
																<b style="color:{{ styles['companyName']['color'] }}; font-weight: bold">M</b> {% if isPreview %} 0123456789 {% else %} {{ user.phone }} {% endif %}
															</td>
															{% endif %}
														</tr>
														{% endif %}
														{# END PHONE #}
													</tbody>
												</table>
											</td>
											<td style="background: {{ styles['divColor']['color'] }}; width: 12px; border-radius: 0 4px 4px 0;"></td>
										</tr></tbody></table>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		{# START EVENT #}
		{% if event or isPreview %}
		<tr>
		{% if styles['event']['enabled'] is same as( 'true' ) %}
		{% if event %}
				<td style="border: none; padding-top: {{ styles['eventPadding']['padding'] }}px; padding-bottom: calc({{ styles['eventPadding']['padding'] }}px - 12px)">
					<a style="height: 126px; display: block;" href="{{ event.link }}"><img style="padding: 0cm; width: 380px; height: 126px;" height="126" width="380" src="https://api.staging.signally.io/event/token/'{{ user.token }}'/image" alt='{{ event.name }}'/></a>
				</td>
				{# START ELSE #}
			{% else %}
				<td style="border: none; padding-top: {{ styles['eventPadding']['padding'] }}px; padding-bottom: calc({{ styles['eventPadding']['padding'] }}px - 12px)">
					<img style="padding: 0cm; width: 380px; height: 126px;" height="126" width="380" src="http://fakeimg.pl/380x126?font=noto&font_size=14" alt='Event'/>
				</td>
			{% endif %}
			{% endif %}
			{# END ELSE #}
			
		</tr>
		{% endif %}
		{# END EVENT #}
		<tr>
			<td style="width:380px; box-sizing: border-box; border: none; padding-top: 12px;">
				<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border:none; width: 380px;">
					<tbody>
						<tr>
							<td style="border-collapse:collapse; background: #000; width: 8px; height: 44px;border-radius: 4px 0 0 4px;"></td>
							<td style="background: black">
								<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr>
											<td width="360" style="width:360px; border: none; background:black; padding: 0cm" valign="middle">
												<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0">
													<tbody>
														<tr>
															<td nowrap style="width:65px; border: none; background:black; padding: 0cm; font-size: 9.5pt;">
																<p class="x_MsoNormal" style="vertical-align: middle;margin: 0">
																	<b style="color:white; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: 12px; vertical-align: text-top; display: grid;" nowrap>Follow
																																																						                                                                        us</b>
																</p>
															</td>
															{# START SOCIALS #}
															{% if socialMediaAccounts %}
															<td style="width:230px; border: none; background:black; padding: 0cm; height: 24px;" height="24" valign="middle" nowrap>
																<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" height="24">
																	<tbody height="24">
																		<tr height="24">
																		{# START SOCIALSLIST #}
																				{% for media in socialMediaAccounts %}
																				<td height="24" width="24" style="height:24px; width:24px; text-align: left; padding: 0 2px;" valign="top">
																					<a href="{{ media.url }} " height="24" width="24" style="height:24px; width:24px" alt="{{ media.name }} ">
																						<img height="24" width="24" style="vertical-align: middle; display: block; height:24px; width:24px; line-height:24px; margin: 0;" src="{{ media.image }}" alt=''/>
																					</a>
																				</td>
																				{% endfor %}
																				{# END SOCIALSLIST #}
																		</tr>
																	</tbody>
																</table>
															</td>
															{% endif %}
															{# END SOCIALS #}
															<td style="width:55px; border: none; background:black; padding: 0cm; height: 24px;" height="24">
																<img height="24" style="vertical-align: middle; height: 24px; margin-right: 0; text-align: right" src="https://signally-images.s3.eu-west-1.amazonaws.com/MAMA+SHELTER/mama-logo-social.png"/>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td style="border-collapse:collapse; background: #000; width: 8px;border-radius: 0 4px 4px 0;"></td>
						</tr>
					</tbody>
				</td>
			</td>
		</tr>
	</tbody>
</table>
<span style="padding-top: {{ styles['eventPadding']['padding'] }}px">
{# START DISCLAIMERS #}
	{% if disclaimers %}
		{{ disclaimers }}
	{% endif %}
	{# END DISCLAIMERS #}
</span>

`,
	},
	{
		id: 2,
		alignment: "Horizontal",
		tags: ["studio"],
		name: "Warner Bros",
		html: `
	{# START GREETINGS #}
	<span style="padding-bottom: {{ styles['greetingsPadding']['padding'] }};">
	{% if greetings %}
		{{ greetings }}
	{% endif %}
</span>
	{# END GREETINGS #}
<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:0">
	<tbody>
		<tr>
			<td valign="top" style="width:380px; height: 108px; border: none; padding: 0cm">
				<table class="x_MsoTableGrid" border="0" cellspacing="2" cellpadding="2" style="border-collapse:collapse; border:none">
					<tbody>
						<tr>
							<td valign="top" style="width:108px; border: none; padding: 0cm 8px 0 0; font-size: 8.5pt;">
								<p class="x_MsoNormal" style="height: 108px; margin: 0; padding: 0;" height="108" valign="middle">
								<span style="height: 108px;" height="108">
								<a href="{{company.websiteUrl}}"><img style="width: 108px; height: 108px; vertical-align: middle;" height="108" width="108" valign="middle" src="{{ absolute_url(asset(logo)) }}" alt="{{ company.name }}"/></a>
							</span>

								</p>
							</td>
							<td valign="middle" style="box-sizing: border-box; border: none; padding: 0;">
								<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:none; border-color: {{ styles['divColor']['color'] }};">
									<tbody>
										<tr> 
											<td style="border-left: 2px solid {{ styles['divColor']['color'] }}; width: 12px; height: 108px; border-radius: 4px 0 0 4px;"/>
											<td style="box-sizing: border-box; border: none; font-size: 8pt; height: 108px; width: 240px">
												<table class="x_MsoTableGrid" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:none; font-size: 8pt;">
													<tbody>
														<tr height="1">
															<td style="font-size: 8pt; padding:0">
																<b style="color:{{ styles['firstName']['color'] }}; text-decoration: {{ styles['firstName']['textDecoration'] }}; font-style: {{ styles['firstName']['fontStyle'] }}; font-weight: {{ styles['firstName']['fontWeight'] }}; font-size: 8pt; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																	{% if isPreview %} Prénom {% else %} {{ user.firstName }} {% endif %}
                                                                </b>
																<b style="color:{{ styles['lastName']['color'] }}; text-decoration: {{ styles['lastName']['textDecoration'] }} ;font-style: {{ styles['lastName']['fontStyle'] }} ;font-weight: {{ styles['lastName']['fontWeight'] }}; font-size: 8pt; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																{% if isPreview %} Nom {% else %} {{ user.lastName }} {% endif %}
                                                                </b>
															</td>
														</tr>
														<tr style="height: 1px">
															<td>
																<span style="color:{{ styles['jobName']['color'] }}; text-decoration: {{ styles['jobName']['textDecoration'] }} ;font-style: {{ styles['jobName']['fontStyle'] }} ;font-weight: {{ styles['jobName']['fontWeight'] }}; padding: 0cm; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																{% if isPreview %} Poste {% else %} {{ user.position }} {% endif %}
																</span>
															</td>
														</tr>
														<tr height="5"></tr>
														<tr>
															<td>
																<span style="color:{{ styles['addressStreet']['color'] }}; text-decoration: {{ styles['addressStreet']['textDecoration'] }} ;font-style: {{ styles['addressStreet']['fontStyle'] }}; font-weight: {{ styles['addressStreet']['fontWeight'] }}; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">{{ address.street }}
																	{{ address.streetInfo }}
																</span>
															</td>
														</tr>
														<tr>
															<td>
																<span style="color:{{ styles['addressZipcode']['color'] }}; text-decoration: {{ styles['addressZipcode']['textDecoration'] }} ;font-style: {{ styles['addressZipcode']['fontStyle'] }} ;font-weight: {{ styles['addressZipcode']['fontWeight'] }}font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }};">
																	{{ address.zipCode }}
																	{{ address.city }}
																	{{ address.country }}
																</span>
															</td>
														</tr>
														{# START PHONE #}
														{% if user.phone %}
														<tr>
															{% if user.phone or isPreview %}
															<td style=" padding: 0; color: {{ styles['mobile']['color'] }}; font-weight: {{ styles['mobile']['fontWeight'] }}; font-family: {{ styles['generalFontFamily']['fontFamily'] }}; font-size: {{ styles['generalFontSize']['fontSize'] }}">
																<b style="color:{{ styles['companyName']['color'] }}; font-weight: bold">M</b> {% if isPreview %} 0123456789 {% else %} {{ user.phone }} {% endif %}
															</td>
															{% endif %}
														</tr>
														{% endif %}
														{# END PHONE #}
													</tbody>
												</table>
											</td>
										</tr></tbody></table>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		{# START EVENT #}
		{% if event or isPreview %}
		<tr>
		{% if styles['event']['enabled'] is same as( 'true' ) %}
		{% if event %}
				<td style="border: none; padding-top: {{ styles['eventPadding']['padding'] }}px; padding-bottom: calc({{ styles['eventPadding']['padding'] }}px - 12px)">
					<a style="height: 126px; display: block;" href="{{ event.link }}"><img style="padding: 0cm; width: 380px; height: 126px;" height="126" width="380" src="https://api.staging.signally.io/event/token/'{{ user.token }}'/image" alt='{{ event.name }}'/></a>
				</td>
				{# START ELSE #}
			{% else %}
				<td style="border: none; padding-top: {{ styles['eventPadding']['padding'] }}px; padding-bottom: calc({{ styles['eventPadding']['padding'] }}px - 12px)">
					<img style="padding: 0cm; width: 380px; height: 126px;" height="126" width="380" src="http://fakeimg.pl/380x126?font=noto&font_size=14" alt='Event'/>
				</td>
			{% endif %}
			{% endif %}
			{# END ELSE #}
			
		</tr>
		{% endif %}
		{# END EVENT #}
	</tbody>
</table>
<span style="padding-top: {{ styles['eventPadding']['padding'] }}px">
{# START DISCLAIMERS #}
	{% if disclaimers %}
		{{ disclaimers }}
	{% endif %}
	{# END DISCLAIMERS #}
</span>

`,
	}
];

export default function TemplateSelection(props) {
	const [orientation, setOrientation] = useState("Horizontal");
	const [tag, setTag] = useState(true);
	const handleForm = (e) => {
		props.setTemplate(JSON.parse(e.target.value));
	};

	const handleAlignment = (e) => {
		setOrientation(e.target.id);
	};
	const handleStudio = (e) => {
		setTag(e.target.checked);
	};
	return (
		<div className={classes.modal}>
			<div className={classes.searchContainer}>
				<h1>Choisissez votre modèle de signature</h1>
				<div className={classes.tagsContainer}>
					<form onChange={handleStudio}>
						<ul className={classes.studioStore}>
							<li
								className={`${classes.studio} ${tag ? classes.activeStudio : ""
									}`}
							>
								<input
									type="checkbox"
									defaultChecked={tag}
									id="studio"
								/>
								My Studio
							</li>
							<li className={classes.store}>My Store</li>
						</ul>
					</form>
					<div className={classes.otherTagsContainer}>
						<ul className={classes.otherTags}>
							<li>Classique</li>
							<li>Élegant</li>
							<li>Créatif</li>
						</ul>
					</div>
				</div>
				<div className={classes.orientationContainer}>
					<form onChange={handleAlignment}>
						<label
							className={classes.radioCtr}
							htmlFor="horizontal"
						>
							Horizontal
							<input
								type="radio"
								defaultChecked={true}
								id="horizontal"
								name="orientation"
							/>
							<span className={classes.checkmark}></span>
						</label>
						<label
							className={classes.radioCtr}
							htmlFor="panoramique"
						>
							Panoramique
							<input
								type="radio"
								id="panoramique"
								name="orientation"
							/>
							<span className={classes.checkmark}></span>
						</label>
						<label className={classes.radioCtr} htmlFor="vertical">
							Vertical
							<input
								type="radio"
								id="vertical"
								name="orientation"
							/>
							<span className={classes.checkmark}></span>
						</label>
					</form>
				</div>
			</div>
			<form onChange={handleForm}>
				<ul className={classes.templatesContainer}>
					{templateAPI.map((template) => {
						if (
							template.alignment.toLowerCase() ===
							orientation.toLowerCase()
						)
							if (tag) {
								if (
									template.tags[0].toLowerCase() === "studio"
								) {
									return (
										<li key={template.id}>
											<p className={classes.templateName}>
												{template.name}
											</p>
											<input
												readOnly
												type="radio"
												name="template"
												value={JSON.stringify(template)}
											/>
											<Template
												options={{
													event: { enabled: true },
												}}
												template={template.html}
												socials={props.icons}
											/>
										</li>
									);
								}
							} else
								return (
									<li key={template.id}>
										<input
											type="radio"
											name="template"
											value={template.html}
										/>
										<Template
											template={template.html}
											socials={props.icons}
											organisation={props.organisation}
										/>
									</li>
								);
					})}
					{!tag ? (
						<li style={{ width: "412px", height: "220px" }}></li>
					) : (
						""
					)}
				</ul>
				<div className={classes.btnContainer}>
					<Button
						color="orange"
						width={"5rem"}
						onClick={(e) => {
							e.preventDefault();
							props.showFunction();
						}}
					>
						Annuler
					</Button>
				</div>
			</form>
		</div>
	);
}
