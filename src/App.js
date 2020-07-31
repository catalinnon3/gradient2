import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import './css/App.css'
import html2canvas from 'html2canvas';

import eruda from 'eruda';

import { Panel, Title, Footer, View , SimpleCell, ScreenSpinner, Avatar , Button, Snackbar } from '@vkontakte/vkui';

import Icon28StoryOutline from '@vkontakte/icons/dist/28/story_outline';

import Lottie from 'react-lottie'
import animationDataBackground from './animations/background.json'
import animationDataWaves from './animations/wave.json'
import animationDataLoading from './animations/loading2.json'
import {Upload} from "./components/Upload";

import stars from './img/stars.png';

import ru from './img/ru.png';
import ukr from './img/ukr.png';
import cn from './img/cn.png';
import it from './img/it.png';
import bel from './img/bel.png';
import brit from './img/brit.png';
import germ from './img/germ.png';
import grez from './img/grez.png';

import belg from './img/belg.png';
import as from './img/as.png';
import jm from './img/jm.png';
import sz from './img/sz.png';
import pl from './img/pl.png';
import bulg from './img/bulg.png';
import isr from './img/isr.png';
import france from './img/france.png';
import kz from './img/kz.png';
import us from './img/us.png';
import spain from './img/spain.png';

import ph from './img/ph.png';
import sd from './img/sd.png';
import ml from './img/ml.png';
import am from './img/am.png';
import ire from './img/ire.png';
import den from './img/den.png';
import braz from './img/braz.png';

import jp from './img/jp.png';
import ch from './img/ch.png';
import leb from './img/leb.png';
import arab from './img/arab.png';
import afr from './img/afr.png';
import zb from './img/zb.png';
import arg from './img/arg.png';
import ind from './img/ind.png';
import eg from './img/eg.png';
import kor from './img/kor.png';
import mex from './img/mex.png';

import downwards_black_arrow from './img/downwards-black-arrow.png';

const random = require('random');

let app_id = 7554927,
	group_id = 197570628;

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			popout: null,
			activePanel: 'main',
			scheme: 'bright_light',

			can_generate: true
		};

		this.componentDidMount = this.componentDidMount.bind(this);
		this.go = this.go.bind(this);
	}

	async componentDidMount () {
		bridge.subscribe(async ({ detail: { type, data }}) => {
			if(type !== undefined) console.log(type, data);
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = false ? data.scheme ? data.scheme : 'bright_light' : 'bright_light';
				document.body.attributes.setNamedItem(schemeAttribute);
				this.setState({ scheme: schemeAttribute.value });
			}
		});

		let user = await bridge.sendPromise('VKWebAppGetUserInfo');
		this.setState({ photo: user.photo_max_orig, name: user.first_name + ' ' + user.last_name });

		await bridge.send('VKWebAppInit');
		eruda.init();
	}

	go(panel) {
		this.setState({activePanel: panel});
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async uploadFile(element, evt) {
		let tgt = evt.target || window.event.srcElement,
			files = tgt.files;
		const t = this;

		if (FileReader && files && files.length) {
			for (let file of files) {
				let fr = new FileReader();
				fr.onload = async function () {
					let res = fr.result; //base64 result, to get src -> array[0].props.src
					if (file.type.includes('image')) {
						let image = new Image();
						image.src = res;
						image.onload = async function() {
							try{
								await bridge.send('VKWebAppAllowMessagesFromGroup', {group_id, key: 'fsdgeruiogj'});
							}catch (e) {
								this.setState({ snackbar:
										<Snackbar
											layout='vertical'
											onClose={() => this.setState({ snackbar: null })}
										>
											Необходимо разрешение на получение сообщений
										</Snackbar>
								});
								return;
							}

							let canvas = document.createElement('CANVAS'),
								ctx = canvas.getContext('2d');
							canvas.height = 720;
							canvas.width = 720;
							ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 720, 720);
							t.setState({ [element]: res, can_generate: true });

							this.setState({ loading: true });
							setTimeout(()=>{
								this.setState({ loading: false });
							}, 2200);
							let percents = 100;
							let p4 = random.int(1, 4); percents -= p4;
							let p3 = random.int(6, 13); percents -= p3;
							let p2 = random.int(25, 41); percents -= p2;
							let p1 = percents;

							let country = [
								[
									[ 'Россия', ru ],
									[ 'Украина', ukr ],
									[ 'Канада', cn ],
									[ 'Италия', it ],
									[ 'Белорусия', bel ],
									[ 'Британия', brit ],
									[ 'Германия', germ ],
									[ 'Греция', grez ]
								],
								[
									[ 'Бельгия', belg ],
									[ 'Австрия', as ],
									[ 'Ямайка', jm ],
									[ 'Швейцария', sz ],
									[ 'Польша', pl ],
									[ 'Болгария', bulg ],
									[ 'Израиль', isr ],
									[ 'Франция', france ],
									[ 'Казахстан', kz ],
									[ 'США', us ],
									[ 'Испания', spain ]
								],
								[
									[ 'Филлипины', ph ],
									[ 'Швеция', sd ],
									[ 'Молдавия', ml ],
									[ 'Армения', am ],
									[ 'Ирландия', ire ],
									[ 'Дания', den ],
									[ 'Бразилия', braz ]
								],
								[
									[ 'Япония', jp ],
									[ 'Китай', ch ],
									[ 'Ливан', leb ],
									[ 'Саудовская Аравия', arab ],
									[ 'Африка', afr ],
									[ 'Зимбабве', zb ],
									[ 'Аргентина', arg ],
									[ 'Индия', ind ],
									[ 'Египет', eg ],
									[ 'Корея', kor ],
									[ 'Мексика', mex ]
								]
							];
							let c1 = country[0][random.int(0, country[0].length-1)];
							let c2 = c1 === country[0][0] ? country[1][random.int(0, country[1].length-1)] : country[0][0];
							let c3 = country[2][random.int(0, country[2].length-1)];
							let c4 = country[3][random.int(0, country[3].length-1)];

							this.setState({ p1, p2, p3, p4, c1, c2, c3, c4, can_generate: false });
						}.bind(this);
					} else {
						this.setState({ snackbar:
								<Snackbar
									layout='vertical'
									onClose={() => this.setState({ snackbar: null })}
								>
									Необходимо загрузить изображение
								</Snackbar>
						});
					}
				}.bind(this);
				await fr.readAsDataURL(file);
			}
		}
		// Not supported
		else {
			// fallback -- perhaps submit the input to an iframe and temporarily store
			// them on the server until the user's session ends.
		}
	}

	viewportToPixels(value) {
		var parts = value.match(/([0-9\.]+)(vh|vw)/)
		var q = Number(parts[1])
		var side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
		return side * (q/100)
	}

	render() {
		return (
			<View activePanel={this.state.activePanel} popout={this.state.popout}>
				<Panel id='main' style={{ zIndex: 1 }}>
					<Upload onChange={async e => {
						this.uploadFile('photo', e);
					}}>
						<div style={{ background: 'white', height: '40vh' }}>
							<div style={{ paddingTop: 'calc(6vh + var(--safe-area-inset-top))' }}>
								<Avatar crossOrigin={'anonymous'} shadow={false} size={this.viewportToPixels('28vh')} mode='app' src={this.state.photo} className='centered' style={{ borderRadius: '2vh' }}/>
								{ false && <Title level='1' weight='medium' className='centered' style={{ marginTop: 16 }}>{this.state.name}</Title> }
							</div>
						</div>
					</Upload>
					<div style={{ borderTopLeftRadius: '5vh', borderTopRightRadius: '5vh', height: '60vh', background: '#1d1b26' }}>
						{
							this.state.loading ?
								<div className='absolute_centered'>
									<Lottie className='absolute_centered animated-loading' style={{ pointerEvents: 'none', zIndex: -1, transform: 'translateY(4vh)' }} options={{loop: true,
										autoplay: true,
										animationData: animationDataLoading,
										rendererSettings: {
											preserveAspectRatio: 'xMidYMid slice'
										}}} height={'100px'} width={'100px'}
									/>
								</div>
								:
								this.state.can_generate ?
									<Lottie className='absolute_centered' style={{ pointerEvents: 'none', zIndex: -1, transform: 'translateY(4vh)' }} options={{loop: true,
										autoplay: true,
										animationData: animationDataBackground,
										rendererSettings: {
											preserveAspectRatio: 'xMidYMid slice'
										}}} height={'45vh'}
									/>
									:
									<div style={{ width: '100vw', height: '60vh', backgroundImage: `url(${stars})`, backgroundRepeat: 'repeat', opacity: .3 }}/>
						}
						{
							!this.state.loading &&
							<div className='absolute_centered' style={{ width: '100vw' }}>
								{
									this.state.can_generate ?
										<Upload onChange={async e => {
											this.uploadFile('photo', e);
										}}>
											<Title style={{ color: 'white', textAlign: 'center' }} level='3' weight='medium'>Чтобы узнать, кто вы по национальности, загрузите фотографию, где хорошо видно ваше лицо</Title>
											<div className='centered' style={{ marginTop: '16px' }}><Button size={'l'} mode='overlay_secondary'>Загрузить</Button></div>
										</Upload>
										:
										<div style={{ position: 'absolute', top: '-5vh', left: '50%', transform: 'translateX(-50%)', width: '80vw' }}>
											<div className='centered'>
												<img crossOrigin={'anonymous'} src={this.state.c1[1]} height={32} />
												<SimpleCell style={{ height: '6vh', background: 'linear-gradient(90deg, #ffffff00, #e64646)', width: '70vw' }} disabled
															indicator={<Title level={2} weight='medium' style={{ color: 'white' }}>{this.state.p1}%</Title>}>
													<Title level={2} weight='medium' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
														{this.state.c1[0]}
													</Title>
												</SimpleCell>
											</div>
											<div className='centered' style={{ marginTop: '1.5vh' }}>
												<img crossOrigin={'anonymous'} src={this.state.c2[1]} height={32} />
												<SimpleCell style={{ height: '6vh', background: 'linear-gradient(90deg, #ffffff00, #e64646)', width: '70vw' }} disabled
															indicator={<Title level={2} weight='medium' style={{ color: 'white' }}>{this.state.p2}%</Title>}>
													<Title level={2} weight='medium' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
														{this.state.c2[0]}
													</Title>
												</SimpleCell>
											</div>
											<div className='centered' style={{ marginTop: '1.5vh' }}>
												<img crossOrigin={'anonymous'} src={this.state.c3[1]} height={32} />
												<SimpleCell style={{ height: '6vh', background: 'linear-gradient(90deg, #ffffff00, #e64646)', width: '70vw' }} disabled
															indicator={<Title level={2} weight='medium' style={{ color: 'white' }}>{this.state.p3}%</Title>}>
													<Title level={2} weight='medium' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
														{this.state.c3[0]}
													</Title>
												</SimpleCell>
											</div>
											<div className='centered' style={{ marginTop: '1.5vh' }}>
												<img crossOrigin={'anonymous'} src={this.state.c4[1]} height={32} />
												<SimpleCell style={{ height: '6vh', background: 'linear-gradient(90deg, #ffffff00, #e64646)', width: '70vw' }} disabled
															indicator={<Title level={2} weight='medium' style={{ color: 'white' }}>{this.state.p4}%</Title>}>
													<Title level={2} weight='medium' style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
														{this.state.c4[0]}
													</Title>
												</SimpleCell>
											</div>

											{
												this.state.screen ?
													<Footer>
														<Title level={2} weight='semibold' style={{ color: 'white' }}>
															Переходи в приложение, чтобы узнать свою национальность
															<br/>
															<img crossOrigin={'anonymous'} style={{ marginTop: '12px' }} height='26px' src={downwards_black_arrow}/>
															<img crossOrigin={'anonymous'} style={{ marginLeft: '8px' }} height='26px' src={downwards_black_arrow}/>
															<img crossOrigin={'anonymous'} style={{ marginLeft: '8px' }} height='26px' src={downwards_black_arrow}/>
														</Title>
													</Footer>
													:
													<Footer><span style={{ color: 'white', opacity: .5 }}>Чтобы изменить фото, нажмите на свой аватар</span></Footer>

											}
										</div>
								}
							</div>
						}
						{
							!this.state.loading && !this.state.can_generate && !this.state.screen &&
							<div style={{ position: 'absolute' , bottom: '1vh', width: '100vw', zIndex: 1 }}>
								<Button onClick={async ()=>{
									try{
										this.setState({ popout: <ScreenSpinner/>, screen: true });
										await this.sleep(750);
										let element = document.getElementById('main');
										html2canvas(element, { allowTaint: true }).then(async canvas => {
											let blob = canvas.toDataURL('image/jpg');
											try{
												await bridge.send('VKWebAppShowStoryBox', { background_type: 'image', blob, attachment: { url: 'https://vk.com/app' + app_id, text: 'open', type: 'url' } });
												this.setState({ shared: true });
											}catch (e) {}
											this.setState({ popout: null, screen: false });
										});
									}catch (e) {
										console.error(e);
										this.setState({ snackbar:
												<Snackbar
													layout='vertical'
													onClose={() => this.setState({ snackbar: null })}
												>
													Ошибка
												</Snackbar>
										});
										this.setState({ popout: null, screen: false });
									}
								}} style={{ background: '#ffffff00', color: 'white', fontSize: '20px', letterSpacing: '1px' }} before={<Icon28StoryOutline/>} size='xl'>Поделиться в истории</Button>
							</div>
						}

						<Lottie style={{ position: 'absolute' , bottom: 0, pointerEvents: 'none' }} options={{loop: true,
							autoplay: true,
							animationData: animationDataWaves,
							rendererSettings: {
								preserveAspectRatio: 'xMidYMid slice'
							}}}
								height={'45vh'}
								width={'100vw'}
						/>

						{this.state.snackbar}
					</div>
				</Panel>
			</View>
		);
	}
}

export default App;