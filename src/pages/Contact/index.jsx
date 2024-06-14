import React from 'react'
import Meta from '../Our Store/Meta'
import BreadCrumb from '../../components/common/BreadCrumb'
import './styles.css'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi'
const Contact = () => {
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title={"Contact Us"} />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.707324770735!2d105.84399817560532!3d21.004365980638912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76827aaaab%3A0xf0580eb2ff0e1b64!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIFRydXnhu4FuIFRow7RuZyAtIMSQ4bqhaSBI4buNYyBCw6FjaCBraG9hIEjDoCBu4buZaQ!5e0!3m2!1svi!2s!4v1714711244024!5m2!1svi!2s"
                width="600"
                height="450"
                className="border-0 w-100"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className='contact-inner-wrapper d-flex justify-content-between'>
                <div>
                  <h3 className='contact-title mb-4'>Contact</h3>
                  <form action='' className='d-flex flex-column gap-15'>
                    <div>
                      <input type='text' className=' form-control'/>
                    </div>
                    <div>
                      <input type='email' className=' form-control' placeholder='Email'/>
                    </div>
                    <div>
                      <input type='text' className=' form-control' placeholder='Mobile Number'/>
                    </div>
                    <div>
                      <textarea name="" className='w-100 form-control' id="" cols="30" rows="5" placeholder='Comments'></textarea>
                    </div>
                    <div>
                      <button className=' button border-0'>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className='contact-title mb-4'>Get In Touch With Us</h3>
                  <ul className='ps-0' >
                    <li className='mb-3 d-flex gap-10 align-items-center'>
                      <AiOutlineHome className='fs-5 '/>
                      <address>cổng Trần Đại Nghĩa-đại học Bách Khoa Hà Nội</address>
                    </li>
                    <li className='mb-3 d-flex gap-10 align-items-center'>
                      <BiPhoneCall className='fs-5'/>
                      <a href="tel:0918585766">0918585766</a>
                    </li>
                    <li className='mb-3 d-flex gap-10 align-items-center'>
                      <AiOutlineMail className='fs-5'/>
                      <a href="mailto:chuthanh1310@gmail.com">chuthanh1310@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex gap-10 align-items-center'>
                      <BiInfoCircle className='fs-5'/>
                      <p className='mb-0'>All week except Sunday from 8am to 6pm</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact