// keystatic.config.ts
import { collection, config, fields, singleton } from '@keystatic/core';
import { block, wrapper } from '@keystatic/core/content-components';
import { ContactIcon, ContainerFluidIcon, ContainerIcon, FlexboxIcon, GeneralIcon, HeroIcon } from '../../.keystatic/keystatic-icons';
import { BrandMarkComponent } from '../../.keystatic/mark';

export default config({
	storage: {
		kind: 'local',
	},
	ui: {
		brand: {
			name: 'ByBil ApS',
			mark: BrandMarkComponent,
		},
	},
	singletons: {
		header: singleton({
			label: 'Navigation',
			path: 'src/content/global/header',
			format: {
				data: 'json',
			},
			schema: {
				logo: fields.object({
					imagePath: fields.image({
						label: 'Logo',
						directory: 'src/assets/global',
						publicPath: '/src/assets/global/',
						validation: {
							isRequired: false,
						},
					}),
					title: fields.text({
						label: 'Title',
					}),
				}),
				pages: fields.array(
					fields.object({
						title: fields.text({
							label: 'Title',
						}),
						link: fields.text({
							label: 'Url',
						}),
					}),
					// Labelling options
					{
						label: 'Pages',
						itemLabel: (props) => props.fields.title.value,
					},
				),
				actions: fields.array(
					fields.object({
						title: fields.text({
							label: 'Title',
						}),
						link: fields.text({
							label: 'Url',
						}),
						style: fields.select({
							label: 'Style',
							options: [
								{
									label: 'Filled',
									value: 'button',
								},
								{
									label: 'Outlined',
									value: 'outline',
								},
							],
							defaultValue: 'button',
						}),
					}),
					// Labelling options
					{
						label: 'Actions',
						itemLabel: (props) => props.fields.title.value,
					},
				),
				contacts: fields.object(
					{
						phone: fields.text({
							label: 'Phone',
						}),
						mail: fields.text({
							label: 'Email',
						}),
						address: fields.text({
							label: 'Address',
						}),
					},
					{
						label: 'Contacts',
					},
				),
				socials: fields.array(
					fields.object({
						icon: fields.text({
							label: 'Icon',
						}),
						link: fields.text({
							label: 'Url',
						}),
					}),
					{
						itemLabel: (props) => props.fields.link.value,
						label: 'Social',
					},
				),
			},
		}),
		footer: singleton({
			label: 'Footer',
			path: 'src/content/global/footer',
			format: {
				data: 'json',
			},
			schema: {
				title: fields.text({
					label: 'Title',
				}),
				subtitle: fields.text({
					label: 'Subtitle',
				}),
				copyright: fields.text({
					label: 'Copyright',
				}),
				contacts: fields.object(
					{
						phone: fields.text({
							label: 'Phone',
						}),
						mail: fields.text({
							label: 'Email',
						}),
						socials: fields.array(
							fields.object({
								title: fields.text({
									label: 'Title',
								}),
								link: fields.text({
									label: 'Url',
								}),
								icon: fields.text({
									label: 'Icon',
								}),
							}),
							{
								label: 'Social',
								itemLabel: (props) => props.fields.title.value ?? 'Imposta un titolo',
							},
						),
					},
					{
						label: 'Contacts',
					},
				),
			},
		}),
	},
	collections: {
		pages: collection({
			label: 'Pages',
			slugField: 'title',
			path: 'src/content/pages/it/*',
			entryLayout: 'content',
			columns: [
				'title',
				'lastUpdateDate',
			],
			previewUrl: '/{slug}',
			format: {
				contentField: 'content',
			},
			schema: {
				title: fields.slug({
					name: {
						label: 'Title',
						description: 'Titolo della pagina',
						validation: {
							isRequired: true,
						},
					},
					// Optional slug label overrides
					slug: {
						label: 'SEO-friendly slug',
						description: 'Slug da usare per la pagina, attenzione, è consigliato non modificarlo dopo la pubblicazione.',
					},
				}),
				subtitle: fields.text({
					label: 'Subtitle',
					multiline: true,
				}),
				cover: fields.image({
					label: 'Cover Image',
					directory: 'src/assets/pages',
					publicPath: '@/assets/pages/',
				}),
				type: fields.select({
					label: 'Tipo pagina',
					options: [
						{
							label: 'Informativa',
							value: 'informational',
						},
						{
							label: 'Contatti/supporto',
							value: 'support',
						},
						{
							label: 'Termini e condizioni',
							value: 'terms',
						},
					],
					defaultValue: 'informational',
				}),
				lastUpdateDate: fields.date({
					label: 'Last Update Date',
					description: "Data dell'ultimo aggiornamento della pagina",
					defaultValue: {
						kind: 'today',
					},
					validation: {
						isRequired: true,
					},
				}),
				hideTitle: fields.checkbox({
					label: 'Nascondi titolo',
					defaultValue: false,
				}),
				addPadding: fields.checkbox({
					label: 'Aggiungi padding',
					defaultValue: true,
				}),
				seo: fields.object(
					{
						title: fields.text({
							label: 'Titolo SEO',
							validation: {
								isRequired: true,
								length: {
									// min: 10,
								},
							},
						}),
						description: fields.text({
							label: 'Descrizione SEO',
							multiline: true,
							validation: {
								isRequired: true,
								length: {
									// min: 50,
								},
							},
						}),
					},
					{
						label: 'SEO',
						description: 'Opzioni SEO per la pagina',
					},
				),
				content: fields.markdoc({
					label: 'Content',
					options: {
						heading: [
							2,
							3,
							4,
							5,
							6,
						],
						image: {
							directory: 'src/assets/pages',
							publicPath: '/src/assets/pages/',
						},
					},
					components: {
						Container: wrapper({
							label: 'Contenitore',
							icon: ContainerIcon({
								ariaHidden: true,
							}),
							description: 'Contenitore che ti consente di agiungere del margine a destra e sinistra',
							schema: {
								class: fields.text({
									label: 'Classi custom',
								}),
							},
						}),
						ContainerFluid: wrapper({
							label: 'Contenitore largo',
							icon: ContainerFluidIcon({
								ariaHidden: true,
							}),
							description: 'Contenitore che ti consente di avere del margine a destra e sinistra',
							schema: {
								class: fields.text({
									label: 'Classi custom',
								}),
							},
						}),
						Flex: wrapper({
							label: 'Flexbox',
							icon: FlexboxIcon({
								ariaHidden: true,
							}),
							description: 'Contenitore flessibile',
							schema: {
								class: fields.text({
									label: 'Classi custom',
									description: 'Aggiungi classi personalizzate al contenitore',
								}),
								direction: fields.select({
									label: 'Direzione',
									description: 'Scegli la direzione del contenitore',
									options: [
										{
											label: 'Da sinistra a destra',
											value: 'ltr',
										},
										{
											label: 'Da destra a sinistra',
											value: 'rtl',
										},
										{
											label: "Dall'alto in basso",
											value: 'ttb',
										},
										{
											label: 'Dal basso in alto',
											value: 'btt',
										},
									],
									defaultValue: 'ltr',
								}),
								verticalAlign: fields.select({
									label: 'Allineamento verticale',
									description: "Scegli l'allineamento verticale del contenitore",
									options: [
										{
											label: 'In alto',
											value: 'top',
										},
										{
											label: 'Al centro',
											value: 'middle',
										},
										{
											label: 'In basso',
											value: 'bottom',
										},
										{
											label: 'Espandi',
											value: 'stretch',
										},
										{
											label: 'Spaziato',
											value: 'spaceBetween',
										},
										{
											label: 'Spaziato intorno',
											value: 'spaceAround',
										},
									],
									defaultValue: 'top',
								}),
								horizontalAlign: fields.select({
									label: 'Allineamento orizzontale',
									description: "Scegli l'allineamento orizzontale del contenitore",
									options: [
										{
											label: 'A sinistra',
											value: 'left',
										},
										{
											label: 'Al centro',
											value: 'center',
										},
										{
											label: 'A destra',
											value: 'right',
										},
										{
											label: 'Spaziato',
											value: 'spaceBetween',
										},
										{
											label: 'Spaziato intorno',
											value: 'spaceAround',
										},
										{
											label: 'Spaziato uniformemente',
											value: 'spaceEvenly',
										},
									],
									defaultValue: 'left',
								}),
								itemsAlignment: fields.select({
									label: 'Allineamento oggetti',
									description: "Scegli l'allineamento degli oggetti all'interno del contenitore",
									options: [
										{
											label: "All'inizio",
											value: 'start',
										},
										{
											label: 'Al centro',
											value: 'center',
										},
										{
											label: 'Alla fine',
											value: 'end',
										},
										{
											label: 'Espandi',
											value: 'stretch',
										},
										{
											label: 'Alla base del testo',
											value: 'baseline',
										},
									],
									defaultValue: 'start',
								}),
								gap: fields.number({
									label: 'Spaziatura',
									description: 'Scegli lo spazio tra gli oggetti',
									defaultValue: 0,
								}),
								wrap: fields.checkbox({
									label: 'Vai a capo',
									description: "Scegli se andare a capo o meno quando non c'è più spazio nel contenitore",
									defaultValue: false,
								}),
							},
						}),
						Hero: block({
							label: 'Hero',
							description: "Sezione hero dell'homepage",
							icon: HeroIcon({
								ariaHidden: true,
							}),
							schema: {
								title: fields.text({
									label: 'Title',
									validation: {
										isRequired: true,
									},
								}),
								subtitle: fields.text({
									label: 'Subtitle',
									validation: {
										isRequired: true,
									},
								}),
								buttons: fields.array(
									fields.object({
										title: fields.text({
											label: 'Title',
										}),
										href: fields.text({
											label: 'Url',
										}),
										style: fields.select({
											label: 'Style',
											options: [
												{
													label: 'Filled',
													value: 'button',
												},
												{
													label: 'Outlined',
													value: 'outline',
												},
											],
											defaultValue: 'button',
										}),
										icon: fields.text({
											label: 'Icona',
										}),
									}),
									// Labelling options
									{
										label: 'Actions',
										itemLabel: (props) => props.fields.title.value,
									},
								),
							},
						}),
						LogoCloud: block({
							label: 'LogoCloud',
							description: 'LogoCloud',
							icon: GeneralIcon({
								ariaHidden: true,
							}),
							schema: {
								title: fields.text({
									label: 'Title',
									validation: {
										isRequired: true,
									},
								}),
								logos: fields.array(
									fields.image({
										label: 'Logo',
										directory: 'src/assets/pages',
										publicPath: '/src/assets/pages/',
									}),
									{
										label: 'Loghi',
									},
								),
							},
						}),
						Services: block({
							label: 'Services',
							description: 'Services',
							icon: GeneralIcon({
								ariaHidden: true,
							}),
							schema: {
								title: fields.text({
									label: 'Title',
									validation: {
										isRequired: true,
									},
								}),
								services: fields.array(
									fields.object({
										title: fields.text({
											label: 'Title',
										}),
										description: fields.text({
											label: 'Description',
											multiline: true,
										}),
										icon: fields.image({
											label: 'Icona',
											directory: 'src/assets/pages',
											publicPath: '/src/assets/pages/',
										}),
									}),
									// Labelling options
									{
										label: 'Servizi',
										itemLabel: (props) => props.fields.title.value,
									},
								),
							},
						}),
						VideoEffect: block({
							label: 'VideoEffect',
							description: 'VideoEffect',
							icon: GeneralIcon({
								ariaHidden: true,
							}),
							schema: {},
						}),
						Testimonial: block({
							label: 'Testimonial',
							description: 'Testimonial',
							icon: GeneralIcon({
								ariaHidden: true,
							}),
							schema: {
								testimonial: fields.text({
									label: 'Testimonial',
									multiline: true,
									validation: {
										isRequired: true,
									},
								}),
								name: fields.text({
									label: 'Name',
									validation: {
										isRequired: true,
									},
								}),
							},
						}),
						Results: block({
							label: 'Results',
							description: 'Results',
							icon: GeneralIcon({
								ariaHidden: true,
							}),
							schema: {
								title: fields.text({
									label: 'Title',
									validation: {
										isRequired: true,
									},
								}),
								results: fields.array(
									fields.object({
										label: fields.text({
											label: 'Label',
										}),
										value: fields.text({
											label: 'Value',
										}),
									}),
									// Labelling options
									{
										label: 'Risultati',
										itemLabel: (props) => props.fields.label.value,
									},
								),
							},
						}),
						About: block({
							label: 'About',
							description: 'About section',
							icon: GeneralIcon({
								ariaHidden: true,
							}),
							schema: {
								title: fields.text({
									label: 'Title',
									validation: {
										isRequired: true,
									},
								}),
								subtitle: fields.text({
									label: 'Subtitle',
									validation: {
										isRequired: true,
									},
								}),
								content: fields.text({
									label: 'Content',
									multiline: true,
									validation: {
										isRequired: true,
									},
								}),
							},
						}),
						Contact: block({
							label: 'Contact',
							description: 'Contact form section',
							icon: ContactIcon({
								ariaHidden: true,
							}),
							schema: {
								title: fields.text({
									label: 'Title',
									validation: {
										isRequired: true,
									},
								}),
								fields: fields.array(
									fields.object({
										label: fields.text({
											label: 'Label',
										}),
										placeholder: fields.text({
											label: 'Placeholder',
										}),
										width: fields.number({
											label: 'Width',
										}),
										type: fields.select({
											label: 'Type',
											options: [
												{
													label: 'Text',
													value: 'text',
												},
												{
													label: 'Email',
													value: 'email',
												},
												{
													label: 'Textarea',
													value: 'textarea',
												},
											],
											defaultValue: 'text',
										}),
										required: fields.checkbox({
											label: 'Required',
										}),
									}),
									{
										label: 'Fields',
										itemLabel: (props) => props.fields.label.value,
									},
								),
							},
						}),
					},
				}),
			},
		}),
		posts: collection({
			label: 'Posts',
			slugField: 'title',
			path: 'src/content/posts/it/*',
			entryLayout: 'content',
			columns: [
				'title',
				'lastUpdateDate',
			],
			previewUrl: '/post/{slug}',
			format: {
				contentField: 'content',
			},
			schema: {
				title: fields.slug({
					name: {
						label: 'Title',
						description: 'Titolo del post',
						validation: {
							isRequired: true,
						},
					},
					// Optional slug label overrides
					slug: {
						label: 'SEO-friendly slug',
						description: 'Slug da usare per il post, attenzione, è consigliato non modificarlo dopo la pubblicazione.',
					},
				}),
				description: fields.text({
					label: 'Description',
					multiline: true,
					validation: {
						isRequired: true,
					},
				}),
				cover: fields.image({
					label: 'Cover Image',
					directory: 'src/assets/posts',
					publicPath: '@/assets/posts/',
				}),
				tags: fields.array(
					fields.text({
						label: 'Tag',
					}),
					{
						label: 'Tag',
						itemLabel: (props) => props.value,
					},
				),
				pubDate: fields.date({
					label: 'Publication Date',
					description: "Data di pubblicazione dell'articolo",
					defaultValue: {
						kind: 'today',
					},
					validation: {
						isRequired: true,
					},
				}),
				lastUpdateDate: fields.date({
					label: 'Last Update Date',
					description: "Data dell'ultimo aggiornamento dell'articolo'",
					defaultValue: {
						kind: 'today',
					},
					validation: {
						isRequired: true,
					},
				}),
				hidden: fields.checkbox({
					label: 'Hidden',
				}),
				content: fields.markdoc({
					label: 'Content',
					options: {
						heading: [
							2,
							3,
							4,
							5,
							6,
						],
						image: {
							directory: 'src/assets/posts',
							publicPath: '/src/assets/posts/',
						},
					},
					components: {},
				}),
			},
		}),
	},
});
